/**
 * Monta a imagem única da vitrine do hero, com as cinco marcas.
 *
 *   node scripts/montar-vitrine.mjs
 *
 * Os lineups de cada marca são um bloco só (os frascos se tocam, não dá para
 * separá-los por transparência). Em fila única eles ficariam numa tira de 5:1,
 * pequena demais no hero — então a composição usa duas fileiras, como produtos
 * mais à frente e mais ao fundo de uma mesma bancada.
 *
 * Gera public/images/hero/vitrine-marcas.webp
 */
import fs from "node:fs";
import sharp from "sharp";

sharp.cache(false);

const ALTURA_FRENTE = 980;
const MARGEM_BASE = 18;

// Fileira da frente: as marcas de maior apelo no varejo.
const frente = [
  { arquivo: "tuff-linha", escala: 0.9 },
  { arquivo: "clorogel", escala: 1.0 },
  { arquivo: "pedrex", escala: 0.95 },
];

// Fileira de trás: menores, levantadas e levemente desfocadas para dar
// profundidade. Ficam nos vãos abertos entre os grupos da frente — sem esses
// vãos elas sumiriam atrás e a marca não apareceria.
// `centro` é preenchido depois, a partir dos vãos reais da fileira da frente.
const fundo = [{ arquivo: "lavinia", escala: 0.78 }, { arquivo: "asseptgel", escala: 0.78 }];

async function preparar(arquivo, alturaAlvo) {
  const buffer = await sharp(`public/images/produtos-showcase/${arquivo}.webp`)
    .trim({ threshold: 1 })
    .resize({ height: Math.round(alturaAlvo), fit: "inside" })
    .toBuffer();
  const { width, height } = await sharp(buffer).metadata();
  return { buffer, width, height };
}

// ---- fileira da frente: define a largura da arte -------------------------
const pecasFrente = [];
for (const marca of frente) {
  pecasFrente.push(await preparar(marca.arquivo, (ALTURA_FRENTE - MARGEM_BASE) * marca.escala));
}

// Vão positivo entre os grupos da frente: é por ele que a fileira de trás
// aparece.
const ESPACO = Math.round(pecasFrente[0].width * 0.2);
const largura =
  pecasFrente.reduce((s, p) => s + p.width, 0) + ESPACO * (pecasFrente.length - 1);

const ALTURA = ALTURA_FRENTE + 150;
const baseFrente = ALTURA - MARGEM_BASE;
const baseFundo = baseFrente - 150; // mais ao fundo = base mais alta

// ---- fileira de trás -----------------------------------------------------
// Centro de cada vão da fileira da frente: é onde a marca de trás precisa
// cair para ficar realmente visível, em vez de sumir atrás de um bloco.
const vaos = [];
let cursor = 0;
for (const [i, peca] of pecasFrente.entries()) {
  if (i > 0) {
    vaos.push(cursor + ESPACO / 2);
    cursor += ESPACO;
  }
  cursor += peca.width;
}

const camadasFundo = [];
for (const [i, marca] of fundo.entries()) {
  const peca = await preparar(marca.arquivo, (ALTURA_FRENTE - MARGEM_BASE) * marca.escala);
  const suavizado = await sharp(peca.buffer)
    .blur(1.6)
    .modulate({ brightness: 0.97, saturation: 0.94 })
    .toBuffer();

  camadasFundo.push({
    input: suavizado,
    left: Math.round(vaos[i] - peca.width / 2),
    top: baseFundo - peca.height,
  });
}

// ---- sombras de contato --------------------------------------------------
function sombra(cx, rx, cy, ry, opacidade) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(14,34,62,${opacidade})" />`;
}

let x = 0;
const camadasFrente = [];
const elipses = [];

for (const [i, peca] of pecasFrente.entries()) {
  if (i > 0) x += ESPACO;
  camadasFrente.push({ input: peca.buffer, left: Math.round(x), top: baseFrente - peca.height });
  elipses.push(sombra(x + peca.width / 2, peca.width * 0.42, baseFrente - 6, 20, 0.34));
  x += peca.width;
}

for (const camada of camadasFundo) {
  const w = (await sharp(camada.input).metadata()).width;
  elipses.push(sombra(camada.left + w / 2, w * 0.42, baseFundo - 5, 14, 0.2));
}

const piso = await sharp({
  create: { width: largura, height: ALTURA, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    {
      input: Buffer.from(`<svg width="${largura}" height="${ALTURA}">${elipses.join("")}</svg>`),
      top: 0,
      left: 0,
    },
  ])
  .blur(20)
  .png()
  .toBuffer();

// ---- montagem final ------------------------------------------------------
const montado = await sharp(piso)
  .composite([...camadasFundo, ...camadasFrente])
  .png()
  .toBuffer();

// Corta a folga transparente em volta num segundo passe (o `trim` roda antes
// do composite quando está no mesmo pipeline). Sem isso a arte fica com
// proporção mais larga que o conteúdo e os produtos saem menores no hero.
const final = await sharp(montado)
  .trim({ threshold: 1 })
  .webp({ quality: 88, effort: 6, alphaQuality: 96 })
  .toBuffer();

fs.mkdirSync("public/images/hero", { recursive: true });
fs.writeFileSync("public/images/hero/vitrine-marcas.webp", final);

const meta = await sharp(final).metadata();
console.log(
  `vitrine-marcas.webp  ${meta.width}x${meta.height}  ${(final.length / 1024).toFixed(0)} KB  ` +
    `(proporção ${(meta.width / meta.height).toFixed(2)}:1)`,
);
