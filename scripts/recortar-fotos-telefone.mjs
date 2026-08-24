import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Gera public/images/hero/telefone/*.webp — as fotos do hero já recortadas em
 * retrato para o banner de telefone.
 *
 * Por que existe: as fotos originais são todas deitadas. A janela retrato do
 * banner (375x612 CSS) aproveita só 409 a 627px da largura delas, e o aparelho
 * exibe isso em 750 a 1125px reais. Deixando o recorte para o `object-cover`,
 * quem fazia essa ampliação era o navegador, com reamostragem bilinear — daí a
 * foto chegar borrada. E o aparelho ainda baixava a foto inteira para mostrar
 * um terço dela.
 *
 * Recortando aqui, a ampliação vira Lanczos3 com máscara de nitidez, e o
 * arquivo entregue tem só os pixels que aparecem na tela.
 *
 * A origem de cada foto é sempre a maior versão que existe no projeto —
 * preferindo o PNG/JPG de `design-sources/`, que é anterior à compressão, para
 * não empilhar perda de geração sobre perda de geração.
 *
 * Rodar:  node scripts/recortar-fotos-telefone.mjs
 */

// 750px é 2x o slot de 375 e bate com um breakpoint de `deviceSizes` no
// next.config, então o otimizador entrega o arquivo sem reamostrar de novo.
const LARGURA = 750;
const PROPORCAO = 375 / 612;
const ALTURA = Math.round(LARGURA / PROPORCAO);

const DESTINO = "public/images/hero/telefone";

/**
 * `foco` é a fração da largura usada como âncora do recorte, no mesmo sentido
 * do `object-position`. Cada valor foi escolhido simulando o corte real e
 * olhando o resultado, não estimado a partir da composição.
 */
const fotos = [
  {
    saida: "lojas",
    origem: "design-sources/images/hero/fachada-unishop-hero.jpg",
    foco: 0.26,
  },
  {
    saida: "produtos",
    // A arte de produtos é meio ilustração, meio fotografia: a metade direita
    // é a bancada fotografada, e é só ela que serve aqui.
    origem: "public/images/hero/banner-produtos-v1.webp",
    recorteInicial: { esquerdaFracao: 0.42 },
    foco: 0.5,
  },
  {
    saida: "industria",
    // Sem equivalente em design-sources; este webp é a maior versão que existe.
    origem: "public/images/hero/estrutura-industrial.webp",
    foco: 0.45,
  },
  {
    saida: "parceria",
    origem: "design-sources/images/hero/parceria-unishop-premium.png",
    foco: 0.22,
  },
  {
    saida: "profissional",
    origem: "design-sources/images/hero/limpeza-profissional.png",
    foco: 0.62,
  },
];

fs.mkdirSync(DESTINO, { recursive: true });

const relatorio = [];

for (const foto of fotos) {
  let imagem = sharp(foto.origem, { unlimited: true });
  let meta = await imagem.metadata();

  if (foto.recorteInicial) {
    const left = Math.round(meta.width * foto.recorteInicial.esquerdaFracao);
    imagem = sharp(
      await imagem
        .extract({ left, top: 0, width: meta.width - left, height: meta.height })
        .toBuffer(),
    );
    meta = await imagem.metadata();
  }

  // maior janela retrato que a origem comporta
  const larguraJanela = Math.min(meta.width, Math.round(meta.height * PROPORCAO));
  const alturaJanela = Math.min(meta.height, Math.round(larguraJanela / PROPORCAO));

  const buffer = await imagem
    .extract({
      left: Math.round((meta.width - larguraJanela) * foto.foco),
      top: Math.round((meta.height - alturaJanela) / 2),
      width: larguraJanela,
      height: alturaJanela,
    })
    .resize(LARGURA, ALTURA, { kernel: "lanczos3" })
    // Máscara de nitidez: é o que devolve definição depois da ampliação.
    // sigma acima de ~1.2 começa a deixar halo nas bordas de alto contraste
    // (o letreiro da fachada é o caso mais sensível).
    .sharpen({ sigma: 0.9, m1: 0.6, m2: 2.0 })
    // O sharpen lava um pouco a cor; isto devolve, sem estourar.
    .modulate({ saturation: 1.05 })
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toBuffer();

  fs.writeFileSync(path.join(DESTINO, `${foto.saida}.webp`), buffer);

  relatorio.push({
    arquivo: `${foto.saida}.webp`,
    origem: path.basename(foto.origem),
    janela: `${larguraJanela}x${alturaJanela}`,
    entregue: `${LARGURA}x${ALTURA}`,
    kb: Number((buffer.length / 1024).toFixed(0)),
  });
}

console.table(relatorio);
