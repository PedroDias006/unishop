import sharp from "sharp";

/**
 * Prepara as cinco fotos dos cartões da vitrine de marcas.
 *
 * Há dois jeitos de um cartão ficar bom, e o script faz os dois.
 *
 * MODO CENA (Azulim, Tuff, Start PRO)
 * A foto de estúdio já tem cenário próprio e proporção quase igual à do
 * cartão, com o produto começando abaixo da faixa do texto. Ela entra
 * inteira, sangrando de borda a borda, e o texto assenta no céu limpo que a
 * própria foto tem em cima.
 *
 * MODO RECORTE (Asseptgel, Pedrex)
 * Nessas duas o produto sobe até o topo do quadro e bate no título. Aumentar
 * a folga esticando a borda não serve: o Asseptgel é recorte sem fundo, e o
 * Pedrex tem sombra e reflexo que denunciariam o esticamento. Então elas são
 * recompostas — o produto é isolado do fundo, reduzido e assentado na metade
 * de baixo de uma tela vazia com a proporção do cartão. Em volta aparece o
 * degradê que o cartão desenha em CSS.
 *
 * O Pedrex ainda precisa perder o fundo antes, e isso é menos trivial do que
 * parece: as embalagens são brancas sobre um cinza-claro, então separar por
 * tolerância de cor come o produto junto. O caminho que funciona é ajustar um
 * plano ao fundo pelas bordas da foto (ele é um degradê suave, quase linear),
 * marcar como produto tudo que foge desse plano, fechar as falhas com
 * morfologia e ficar só com o maior pedaço conectado. A conta roda numa
 * versão reduzida, onde o ruído já saiu na média, e a máscara é ampliada
 * depois — a silhueta é simples e não perde nada com isso.
 *
 *   node scripts/recompor-vitrine.mjs
 *
 * As origens são os arquivos soltos que vieram do gerador de imagens; ajuste
 * `ORIGEM` e o mapa abaixo quando forem outros.
 */

const ORIGEM = "C:/Users/pedro/Downloads/";
const DESTINO = "./public/images/marcas-vitrine/";

/** Proporção do cartão da vitrine (395x502 no desktop). */
const PROPORCAO = 395 / 502;

/** Largura de saída. Os cartões nunca passam de 395px em tela. */
const LARGURA_FINAL = 900;

/** Tela de trabalho do modo recorte, na proporção do cartão. */
const TELA_L = 1200;
const TELA_A = Math.round(TELA_L / PROPORCAO);

const cartoes = [
  { origem: "ChatGPT Image 22 de ago. de 2026, 03_23_22.png", nome: "azulim", modo: "cena" },
  { origem: "ChatGPT Image 22 de ago. de 2026, 03_09_53.png", nome: "tuff", modo: "cena" },
  { origem: "ChatGPT Image 22 de ago. de 2026, 03_29_13.png", nome: "startpro", modo: "cena" },
  {
    origem: "ChatGPT Image 22 de ago. de 2026, 03_05_38.png",
    nome: "asseptgel",
    modo: "recorte",
    // O texto do cartão termina em 44% da altura no celular, que é onde ele
    // ocupa a maior fatia. 44% deixa o frasco livre nos dois tamanhos.
    topo: 0.44,
    // Passa do pé do cartão de propósito: o punho sai pela borda de baixo, em
    // vez de a mão ficar boiando no meio. É o detalhe que dá realidade à foto.
    base: 1.07,
  },
  {
    origem: "ChatGPT Image 22 de ago. de 2026, 03_31_17.png",
    nome: "pedrex",
    modo: "recorte",
    topo: 0.46,
    base: 0.98,
    tirarFundo: true,
  },
];

/**
 * Separa produto e fundo numa foto de estúdio sem transparência.
 *
 * Devolve uma máscara de 1 canal, já no tamanho da foto: 255 no produto, 0 no
 * fundo.
 */
async function mascaraDoProduto(arquivo, largura, altura, limite = 6) {
  const ESCALA = 600;
  const { data, info } = await sharp(arquivo)
    .resize({ width: ESCALA })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const L = info.width;
  const A = info.height;
  const C = info.channels;
  const N = L * A;
  const em = (x, y, c) => data[(y * L + x) * C + c];

  // 1. Um plano por canal, ajustado por mínimos quadrados às bordas da foto.
  const planos = [];

  for (let c = 0; c < 3; c++) {
    let n = 0, sx = 0, sy = 0, sv = 0, sxx = 0, syy = 0, sxy = 0, sxv = 0, syv = 0;

    const amostrar = (x, y) => {
      const v = em(x, y, c);
      n++; sx += x; sy += y; sv += v;
      sxx += x * x; syy += y * y; sxy += x * y;
      sxv += x * v; syv += y * v;
    };

    for (let x = 0; x < L; x++) for (let k = 0; k < 4; k++) { amostrar(x, k); amostrar(x, A - 1 - k); }
    for (let y = 0; y < A; y++) for (let k = 0; k < 4; k++) { amostrar(k, y); amostrar(L - 1 - k, y); }

    const M = [[n, sx, sy], [sx, sxx, sxy], [sy, sxy, syy]];
    const B = [sv, sxv, syv];

    for (let i = 0; i < 3; i++) {
      let p = i;
      for (let r = i + 1; r < 3; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
      [M[i], M[p]] = [M[p], M[i]];
      [B[i], B[p]] = [B[p], B[i]];
      for (let r = i + 1; r < 3; r++) {
        const f = M[r][i] / M[i][i];
        for (let k = i; k < 3; k++) M[r][k] -= f * M[i][k];
        B[r] -= f * B[i];
      }
    }

    const s = [0, 0, 0];
    for (let i = 2; i >= 0; i--) {
      let v = B[i];
      for (let k = i + 1; k < 3; k++) v -= M[i][k] * s[k];
      s[i] = v / M[i][i];
    }

    planos.push(s);
  }

  // 2. Produto é quem foge do plano.
  let bin = new Uint8Array(N);
  for (let y = 0; y < A; y++) {
    for (let x = 0; x < L; x++) {
      let d = 0;
      for (let c = 0; c < 3; c++) {
        const [a, b, g] = planos[c];
        d = Math.max(d, Math.abs(em(x, y, c) - (a + b * x + g * y)));
      }
      if (d > limite) bin[y * L + x] = 1;
    }
  }

  // 3. Fecha as falhas dentro do produto, depois abre para matar a poeira de
  //    fundo. Separável: uma passada em x, outra em y.
  const morf = (src, raio, dilatar) => {
    const tmp = new Uint8Array(N);
    const out = new Uint8Array(N);

    for (let y = 0; y < A; y++) for (let x = 0; x < L; x++) {
      let v = dilatar ? 0 : 1;
      for (let k = -raio; k <= raio; k++) {
        const xx = Math.min(L - 1, Math.max(0, x + k));
        v = dilatar ? v | src[y * L + xx] : v & src[y * L + xx];
      }
      tmp[y * L + x] = v;
    }

    for (let y = 0; y < A; y++) for (let x = 0; x < L; x++) {
      let v = dilatar ? 0 : 1;
      for (let k = -raio; k <= raio; k++) {
        const yy = Math.min(A - 1, Math.max(0, y + k));
        v = dilatar ? v | tmp[yy * L + x] : v & tmp[yy * L + x];
      }
      out[y * L + x] = v;
    }

    return out;
  };

  bin = morf(morf(bin, 4, true), 4, false);
  bin = morf(morf(bin, 3, false), 3, true);

  // 4. Buraco interno é produto: é fundo só o que se alcança desde a borda.
  const alcancado = new Uint8Array(N);
  const fila = new Int32Array(N);
  let ini = 0, fim = 0;

  const semear = (i) => {
    if (!alcancado[i] && !bin[i]) { alcancado[i] = 1; fila[fim++] = i; }
  };

  for (let x = 0; x < L; x++) { semear(x); semear((A - 1) * L + x); }
  for (let y = 0; y < A; y++) { semear(y * L); semear(y * L + L - 1); }

  while (ini < fim) {
    const i = fila[ini++];
    const x = i % L;
    const y = (i / L) | 0;
    if (x > 0) semear(i - 1);
    if (x < L - 1) semear(i + 1);
    if (y > 0) semear(i - L);
    if (y < A - 1) semear(i + L);
  }

  for (let i = 0; i < N; i++) bin[i] = alcancado[i] ? 0 : 1;

  // 5. Só o maior pedaço continua — qualquer respingo solto no fundo cai fora.
  const rotulo = new Int32Array(N).fill(-1);
  let melhor = -1, maiorArea = 0, proximo = 0;

  for (let semente = 0; semente < N; semente++) {
    if (!bin[semente] || rotulo[semente] >= 0) continue;

    let area = 0;
    ini = 0; fim = 0;
    fila[fim++] = semente;
    rotulo[semente] = proximo;

    while (ini < fim) {
      const i = fila[ini++];
      area++;
      const x = i % L;
      const y = (i / L) | 0;
      for (const v of [x > 0 ? i - 1 : -1, x < L - 1 ? i + 1 : -1, y > 0 ? i - L : -1, y < A - 1 ? i + L : -1]) {
        if (v >= 0 && bin[v] && rotulo[v] < 0) { rotulo[v] = proximo; fila[fim++] = v; }
      }
    }

    if (area > maiorArea) { maiorArea = area; melhor = proximo; }
    proximo++;
  }

  const bruta = Buffer.alloc(N);
  for (let i = 0; i < N; i++) bruta[i] = bin[i] && rotulo[i] === melhor ? 255 : 0;

  // `blur` devolve 3 canais; sem voltar para preto-e-branco, o passo do buffer
  // muda e a máscara sai deslocada na hora de virar alfa.
  return sharp(bruta, { raw: { width: L, height: A, channels: 1 } })
    .resize(largura, altura, { fit: "fill" })
    .blur(1.8)
    .toColourspace("b-w")
    .raw()
    .toBuffer();
}

/** Aplica a máscara como canal alfa da foto. */
async function aplicarAlfa(arquivo, mascara, largura, altura) {
  const base = await sharp(arquivo).removeAlpha().raw().toBuffer();
  const total = largura * altura;
  const rgba = Buffer.alloc(total * 4);

  for (let i = 0; i < total; i++) {
    const j = i * 3;
    const a = mascara[i];
    // Onde é transparente o RGB vira branco: assim a redução não arrasta o
    // cinza do fundo para dentro da borda e não sobra auréola.
    rgba[i * 4] = a ? base[j] : 255;
    rgba[i * 4 + 1] = a ? base[j + 1] : 255;
    rgba[i * 4 + 2] = a ? base[j + 2] : 255;
    rgba[i * 4 + 3] = a;
  }

  return sharp(rgba, { raw: { width: largura, height: altura, channels: 4 } })
    .png()
    .toBuffer();
}

/** O retângulo que o produto de fato ocupa dentro do quadro. */
async function caixaDoProduto(entrada) {
  const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const L = info.width, A = info.height, C = info.channels;
  let x0 = L, x1 = 0, y0 = A, y1 = 0;

  for (let y = 0; y < A; y++) {
    for (let x = 0; x < L; x++) {
      if (data[(y * L + x) * C + 3] > 24) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }

  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

for (const cartao of cartoes) {
  const arquivo = ORIGEM + cartao.origem;
  const meta = await sharp(arquivo).metadata();
  let composta;
  let nota = "";

  if (cartao.modo === "cena") {
    composta = arquivo;
    nota = `${meta.width}x${meta.height} inteira`;
  } else {
    // 1. Isola o produto.
    let recorte = arquivo;

    if (cartao.tirarFundo) {
      const mascara = await mascaraDoProduto(arquivo, meta.width, meta.height);
      recorte = await aplicarAlfa(arquivo, mascara, meta.width, meta.height);
    }

    const caixa = await caixaDoProduto(recorte);
    const so = await sharp(recorte).extract(caixa).png().toBuffer();

    // 2. Quanto ele mede na tela do cartão.
    const alturaAlvo = Math.round((cartao.base - cartao.topo) * TELA_A);
    let larguraAlvo = Math.round(alturaAlvo * (caixa.width / caixa.height));
    let alturaFinal = alturaAlvo;

    if (larguraAlvo > TELA_L) {
      larguraAlvo = TELA_L;
      alturaFinal = Math.round(larguraAlvo * (caixa.height / caixa.width));
    }

    let escalado = await sharp(so).resize(larguraAlvo, alturaFinal, { fit: "fill" }).png().toBuffer();

    // 3. O que passar do pé do cartão é cortado pela borda — é assim que o
    //    punho sai do quadro em vez de a mão boiar no meio.
    const topo = Math.round(cartao.topo * TELA_A);
    const sobra = topo + alturaFinal - TELA_A;

    if (sobra > 0) {
      escalado = await sharp(escalado)
        .extract({ left: 0, top: 0, width: larguraAlvo, height: alturaFinal - sobra })
        .png()
        .toBuffer();
    }

    composta = await sharp({
      create: {
        width: TELA_L,
        height: TELA_A,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: escalado, left: Math.round((TELA_L - larguraAlvo) / 2), top: topo }])
      .png()
      .toBuffer();

    nota = `produto ${caixa.width}x${caixa.height} -> ${larguraAlvo}px de ${TELA_L} (${Math.round((larguraAlvo / TELA_L) * 100)}%), topo em ${Math.round(cartao.topo * 100)}%${sobra > 0 ? `, ${sobra}px saem pelo pé` : ""}`;
  }

  const saida = await sharp(composta)
    .resize({ width: LARGURA_FINAL })
    .webp({ quality: 82 })
    .toFile(DESTINO + cartao.nome + "-large.webp");

  console.log(
    cartao.nome.padEnd(10),
    cartao.modo.padEnd(8),
    `${saida.width}x${saida.height}`.padEnd(10),
    "proporcao",
    (saida.width / saida.height).toFixed(3),
    `${String(Math.round(saida.size / 1024)).padStart(3)}KB`,
    "|",
    nota,
  );
}
