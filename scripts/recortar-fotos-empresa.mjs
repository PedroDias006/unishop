import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Gera public/images/empresa/*.webp — as três fotos da faixa institucional da
 * seção "Conheça a Unishop" (`#modelo` na home).
 *
 * As origens são as mesmas fotos retrato do hero de telefone, mas recortadas
 * em 4:3. O enquadramento deitado mostra outra parte da cena, então a faixa
 * não fica com cara de repetição do banner logo acima.
 *
 * Rodar:  node scripts/recortar-fotos-empresa.mjs
 */

const LARGURA = 720;
const ALTURA = 540;

const DESTINO = "public/images/empresa";

const fotos = [
  {
    saida: "industria",
    origem: "design-sources/images/hero/telefone/industria.png",
    // Os galpões estão na metade de cima; ancorar acima do centro evita
    // cortar a fábrica e sobrar pasto.
    focoVertical: 0.34,
  },
  {
    saida: "loja",
    origem: "design-sources/images/hero/telefone/lojas.png",
    // O letreiro fica no terço superior.
    focoVertical: 0.3,
  },
  {
    saida: "parceiro",
    origem: "design-sources/images/hero/telefone/parceria.png",
    // Enquadra o parceiro e a fachada, sem o calçamento vazio da base.
    focoVertical: 0.22,
  },
];

fs.mkdirSync(DESTINO, { recursive: true });

const relatorio = [];

for (const foto of fotos) {
  const imagem = sharp(foto.origem, { unlimited: true });
  const meta = await imagem.metadata();

  // maior janela 4:3 que a origem comporta
  const larguraJanela = Math.min(meta.width, Math.round((meta.height * LARGURA) / ALTURA));
  const alturaJanela = Math.round((larguraJanela * ALTURA) / LARGURA);

  const buffer = await imagem
    .extract({
      left: Math.round((meta.width - larguraJanela) / 2),
      top: Math.round((meta.height - alturaJanela) * (foto.focoVertical ?? 0.5)),
      width: larguraJanela,
      height: alturaJanela,
    })
    .resize(LARGURA, ALTURA, { kernel: "lanczos3" })
    // Redução forte (1122 -> 720), então basta o toque que devolve o
    // micro-contraste que a reamostragem come.
    .sharpen({ sigma: 0.6, m1: 0.4, m2: 1.4 })
    .webp({ quality: 84, effort: 6 })
    .toBuffer();

  fs.writeFileSync(path.join(DESTINO, `${foto.saida}.webp`), buffer);

  relatorio.push({
    arquivo: `${foto.saida}.webp`,
    janela: `${larguraJanela}x${alturaJanela}`,
    entregue: `${LARGURA}x${ALTURA}`,
    kb: Number((buffer.length / 1024).toFixed(0)),
  });
}

console.table(relatorio);
