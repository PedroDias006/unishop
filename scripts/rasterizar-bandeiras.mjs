import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Gera public/images/state-flags/raster/*.webp — as bandeiras dos estados no
 * tamanho em que realmente aparecem.
 *
 * O componente do mapa mostra a bandeira num quadro de 68x48 CSS, mas servia o
 * SVG original com `unoptimized`. Alguns desses SVGs são traçados
 * complexíssimos: o do Rio tem 219 KB, o do Rio Grande do Sul 169 KB, o de
 * Santa Catarina 159 KB. Ou seja, até 219 KB baixados e rasterizados pelo
 * navegador para desenhar algo do tamanho de uma unha.
 *
 * Aqui viram webp em 204x144 (3x o tamanho de exibição, que cobre telas
 * retina), com fundo transparente para o `object-contain` continuar valendo.
 *
 * Os SVGs continuam no repositório como origem — não são mais baixados pelo
 * visitante.
 *
 * Rodar:  node scripts/rasterizar-bandeiras.mjs
 */

const ORIGEM = "public/images/state-flags";
const DESTINO = path.join(ORIGEM, "raster");

const LARGURA = 204;
const ALTURA = 144;

fs.mkdirSync(DESTINO, { recursive: true });

let antesTotal = 0;
let depoisTotal = 0;
const relatorio = [];

for (const arquivo of fs.readdirSync(ORIGEM)) {
  if (!arquivo.endsWith(".svg")) continue;

  const entrada = path.join(ORIGEM, arquivo);
  const antes = fs.statSync(entrada).size;

  const buffer = await sharp(entrada, { density: 300 })
    .resize(LARGURA, ALTURA, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 90, effort: 6 })
    .toBuffer();

  fs.writeFileSync(path.join(DESTINO, arquivo.replace(".svg", ".webp")), buffer);

  antesTotal += antes;
  depoisTotal += buffer.length;

  if (antes > 20 * 1024) {
    relatorio.push({
      bandeira: arquivo,
      antes: Math.round(antes / 1024) + " KB",
      depois: Math.round(buffer.length / 1024) + " KB",
    });
  }
}

console.table(relatorio);
console.log(
  `total: ${Math.round(antesTotal / 1024)} KB -> ${Math.round(depoisTotal / 1024)} KB`,
);
