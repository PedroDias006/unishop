import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Gera public/images/hero/telefone/*.webp — as fotos do hero recortadas na
 * proporção do banner de telefone.
 *
 * Por que existe: deixar o recorte para o `object-cover` significa mandar a
 * foto inteira e o navegador ampliar a fatia visível com reamostragem
 * bilinear. Isso borrava, e ainda gastava banda com pixels que seriam
 * descartados. Recortando aqui, a reamostragem vira Lanczos3 com máscara de
 * nitidez e o arquivo entregue tem só o que aparece na tela.
 *
 * Quatro das cinco fotos são retrato de origem (1122x1402), então a janela
 * 375:612 sai delas com 859px de largura — mais do que os 828 entregues, ou
 * seja, é redução, e nenhum pixel é inventado. A quinta continua vindo de uma
 * foto deitada, onde a janela dá 627px: essa sai em 750 e ainda é ampliada
 * 1,2x, que é o teto do que aquela origem permite.
 *
 * Rodar:  node scripts/recortar-fotos-telefone.mjs
 */

const PROPORCAO = 375 / 612;

// 828 e 750 são breakpoints de `deviceSizes` no next.config: entregando
// exatamente neles, o otimizador não reamostra de novo.
const LARGURA_PADRAO = 828;

const DESTINO = "public/images/hero/telefone";

/**
 * `foco` é a fração da largura usada como âncora do recorte, no mesmo sentido
 * do `object-position`. Cada valor foi escolhido simulando o corte real e
 * olhando o resultado, não estimado a partir da composição.
 *
 * `alturaFracao` e `focoVertical` fecham o enquadramento quando a foto tem
 * sobra vertical inútil. Só a de produtos usa: a origem tem um terço de
 * armário vazio no topo e as embalagens caíam bem na faixa da cópia. Fechando
 * para 86% da altura e ancorando embaixo, o assunto cresce e o pé vira bancada
 * limpa. Custa resolução (a janela cai de 859 para 739px), por isso essa sai
 * em 750 em vez de 828 — assim continua sendo redução, não ampliação.
 */
const fotos = [
  {
    saida: "lojas",
    origem: "design-sources/images/hero/telefone/lojas.png",
    // Mais à esquerda para o recorte não comer o letreiro Unishop.
    foco: 0.3,
  },
  {
    saida: "produtos",
    origem: "design-sources/images/hero/telefone/produtos.png",
    // A vitrine ocupa a largura toda; centralizar perde o mesmo dos dois lados.
    foco: 0.5,
    alturaFracao: 0.86,
    focoVertical: 0.78,
    largura: 750,
  },
  {
    saida: "industria",
    origem: "design-sources/images/hero/telefone/industria.png",
    foco: 0.5,
  },
  {
    saida: "parceria",
    origem: "design-sources/images/hero/telefone/parceria.png",
    // O parceiro está à esquerda do quadro e é o assunto.
    foco: 0.25,
  },
  {
    saida: "profissional",
    // A única sem versão retrato: continua saindo da foto deitada, onde a
    // janela dá 627px e por isso ainda há ampliação até os 750.
    origem: "design-sources/images/hero/limpeza-profissional.png",
    foco: 0.62,
    largura: 750,
  },
];

fs.mkdirSync(DESTINO, { recursive: true });

const relatorio = [];

for (const foto of fotos) {
  const largura = foto.largura ?? LARGURA_PADRAO;
  const altura = Math.round(largura / PROPORCAO);

  const imagem = sharp(foto.origem, { unlimited: true });
  const meta = await imagem.metadata();

  // maior janela na proporção do banner que a origem comporta, já descontando
  // um eventual fechamento de enquadramento
  const alturaDisponivel = Math.round(meta.height * (foto.alturaFracao ?? 1));
  const larguraJanela = Math.min(meta.width, Math.round(alturaDisponivel * PROPORCAO));
  const alturaJanela = Math.min(meta.height, Math.round(larguraJanela / PROPORCAO));

  const ampliando = largura > larguraJanela;

  let pipeline = imagem
    .extract({
      left: Math.round((meta.width - larguraJanela) * foto.foco),
      top: Math.round((meta.height - alturaJanela) * (foto.focoVertical ?? 0.5)),
      width: larguraJanela,
      height: alturaJanela,
    })
    .resize(largura, altura, { kernel: "lanczos3" });

  // Máscara de nitidez. Quem é ampliado precisa de mais, para repor a
  // definição que a ampliação não inventa; quem é reduzido só precisa do
  // toque que devolve o micro-contraste que a redução come. Acima de ~1.2 de
  // sigma começa a aparecer halo nas bordas de alto contraste — o letreiro da
  // fachada é o caso mais sensível.
  pipeline = ampliando
    ? pipeline.sharpen({ sigma: 0.9, m1: 0.6, m2: 2.0 })
    : pipeline.sharpen({ sigma: 0.6, m1: 0.4, m2: 1.4 });

  const buffer = await pipeline
    // O sharpen lava um pouco a cor; isto devolve, sem estourar.
    .modulate({ saturation: 1.04 })
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toBuffer();

  fs.writeFileSync(path.join(DESTINO, `${foto.saida}.webp`), buffer);

  relatorio.push({
    arquivo: `${foto.saida}.webp`,
    origem: path.basename(foto.origem),
    janela: `${larguraJanela}x${alturaJanela}`,
    entregue: `${largura}x${altura}`,
    escala: ampliando ? `ampliou ${(largura / larguraJanela).toFixed(2)}x` : `reduziu ${(largura / larguraJanela).toFixed(2)}x`,
    kb: Number((buffer.length / 1024).toFixed(0)),
  });
}

console.table(relatorio);
