import sharp from "sharp";
sharp.cache(false);

const marcas = ["clorogel", "tuff-linha", "asseptgel", "lavinia", "pedrex"];

for (const nome of marcas) {
  const img = sharp(`public/images/produtos-showcase/${nome}.webp`).trim({ threshold: 1 });
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Soma de alpha por coluna: colunas zeradas são espaço vazio entre produtos.
  const colunas = new Uint32Array(width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      colunas[x] += data[(y * width + x) * channels + (channels - 1)];
    }
  }

  const limiar = 255 * 3; // ignora fiapos de sombra
  const grupos = [];
  let inicio = -1;
  for (let x = 0; x < width; x++) {
    const cheio = colunas[x] > limiar;
    if (cheio && inicio < 0) inicio = x;
    if (!cheio && inicio >= 0) {
      if (x - inicio > width * 0.02) grupos.push([inicio, x]);
      inicio = -1;
    }
  }
  if (inicio >= 0) grupos.push([inicio, width]);

  console.log(
    `${nome.padEnd(12)} ${width}x${height}  ->  ${grupos.length} grupo(s): ` +
      grupos.map(([a, b]) => `${b - a}px`).join(", "),
  );
}
