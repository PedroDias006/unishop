/**
 * Importa o catálogo completo de produtos da Start Química — a indústria que
 * fabrica tudo o que a loja Unishop vende — para dentro deste projeto.
 *
 *   node scripts/importar-produtos.mjs           # importa tudo
 *   node scripts/importar-produtos.mjs --limite 40   # amostra, para testar
 *
 * Gera:
 *   src/data/produtos.json          catálogo (famílias, variantes e filtros)
 *   public/images/produtos/*.webp   imagens reduzidas e recomprimidas
 *
 * Como a leitura é feita
 * ----------------------
 * O site de origem é Laravel + Livewire: não há API pública, mas a listagem
 * (`/pt-BR/produtos`) é HTML renderizado no servidor e o sitemap traz a URL de
 * todos os SKUs. Então são duas varreduras:
 *
 * 1. LISTAGENS — para cada setor, cada marca/categoria/ambiente é uma
 *    listagem paginada. É de lá que sai a classificação de cada produto, com
 *    a taxonomia da própria empresa em vez de uma inventada aqui.
 * 2. SKUs — cada URL de produto do sitemap. É de lá que saem descrição,
 *    imagem, embalagens, fragrâncias e superfícies de aplicação.
 *
 * Os SKUs são agrupados por família (o primeiro trecho da URL): "Limpa
 * Porcelanato Azulim" é uma família com duas fragrâncias, e é assim que a
 * vitrine mostra — um cartão por família, com as variações trocáveis dentro.
 *
 * O HTML baixado fica em cache no diretório temporário do sistema, então
 * rodar de novo custa segundos em vez de minutos.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);

const ORIGEM = "https://www.startquimica.com.br";
const SETORES = [
  { id: "para_casa", nome: "Para casa" },
  { id: "para_empresa", nome: "Para empresa" },
  { id: "para_voce", nome: "Para você" },
];

const UA = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Accept-Language": "pt-BR,pt;q=0.9",
};

const CACHE = path.join(os.tmpdir(), "unishop-import-produtos");
const DESTINO_JSON = "src/data/produtos.json";
const DESTINO_IMG = "public/images/produtos";

/** Altura máxima da imagem exportada. O cartão da vitrine usa ~220px. */
const ALTURA_IMAGEM = 420;
const QUALIDADE = 72;

const CONCORRENCIA = 8;

const limiteArg = process.argv.indexOf("--limite");
const LIMITE = limiteArg > -1 ? Number(process.argv[limiteArg + 1]) : Infinity;

// ---------------------------------------------------------------------------
// Rede
// ---------------------------------------------------------------------------

fs.mkdirSync(CACHE, { recursive: true });

function arquivoDeCache(url) {
  return path.join(CACHE, `${crypto.createHash("sha1").update(url).digest("hex")}.html`);
}

async function baixarHtml(url) {
  const cache = arquivoDeCache(url);
  if (fs.existsSync(cache)) return fs.readFileSync(cache, "utf8");

  for (let tentativa = 1; tentativa <= 3; tentativa += 1) {
    try {
      const resposta = await fetch(url, { headers: UA });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const html = await resposta.text();
      fs.writeFileSync(cache, html);
      return html;
    } catch (erro) {
      if (tentativa === 3) throw new Error(`${erro.message} em ${url}`);
      await new Promise((r) => setTimeout(r, 400 * tentativa));
    }
  }
}

/** Roda `tarefa` sobre `itens` com no máximo `CONCORRENCIA` em paralelo. */
async function emLote(itens, tarefa, rotulo) {
  const resultados = [];
  let indice = 0;
  let concluidos = 0;

  async function trabalhador() {
    while (indice < itens.length) {
      const meu = indice++;
      try {
        resultados[meu] = await tarefa(itens[meu], meu);
      } catch (erro) {
        resultados[meu] = null;
        process.stderr.write(`\n  ! ${erro.message}\n`);
      }
      concluidos += 1;
      if (concluidos % 20 === 0 || concluidos === itens.length) {
        process.stdout.write(`\r  ${rotulo}: ${concluidos}/${itens.length}   `);
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCORRENCIA, itens.length) }, trabalhador),
  );
  process.stdout.write("\n");
  return resultados;
}

// ---------------------------------------------------------------------------
// Leitura do HTML
// ---------------------------------------------------------------------------

function limparTexto(valor) {
  return valor
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // O "modo de uso" da origem vem com ** de markdown no meio do texto.
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tira o acento sem mudar o comprimento — índice de um serve no outro. */
function semAcento(valor) {
  return valor.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/**
 * O `<h1>` do site de origem vem em caixa alta e, em boa parte dos produtos,
 * sem acento ("AGUA SANITARIA TUFF"). O mesmo nome costuma aparecer acentuado
 * no meio da descrição, então é de lá que os acentos são resgatados.
 */
function recuperarAcentos(nome, textos) {
  const alvo = semAcento(nome).toLocaleLowerCase("pt-BR");

  for (const texto of textos) {
    if (!texto) continue;
    const posicao = semAcento(texto).toLocaleLowerCase("pt-BR").indexOf(alvo);
    if (posicao !== -1) return texto.slice(posicao, posicao + nome.length);
  }

  return nome;
}

/** "Limpa Porcelanato Azulim" a partir de "LIMPA PORCELANATO AZULIM". */
function capitalizar(nome) {
  const minusculas = new Set(["e", "de", "da", "do", "das", "dos", "com", "em", "para", "a", "o"]);

  return nome
    .toLocaleLowerCase("pt-BR")
    .split(/\s+/)
    .map((palavra, indice) => {
      if (indice > 0 && minusculas.has(palavra)) return palavra;
      // Siglas e medidas ficam como estão: 5L, 500ml, PRO, H1N1.
      if (/\d/.test(palavra)) return palavra.toUpperCase();
      return palavra.charAt(0).toLocaleUpperCase("pt-BR") + palavra.slice(1);
    })
    .join(" ");
}

/** Os links de filtro da listagem: marca, categoria e ambiente, com o nome. */
function lerFacetas(html) {
  const facetas = { marca: new Map(), categoria: new Map(), ambiente: new Map() };
  const regex = /<a[^>]*href="[^"]*\/pt-BR\/produtos\?([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;

  for (const [, query, interno] of html.matchAll(regex)) {
    const parametros = new URLSearchParams(query.replace(/&amp;/g, "&"));
    if (parametros.has("page")) continue;

    for (const tipo of ["marca", "categoria", "ambiente"]) {
      const id = parametros.get(tipo);
      const nome = limparTexto(interno);
      // Só interessa o link "puro" do filtro (um facet + setor), não os chips
      // que combinam marca com categoria.
      if (!id || !nome || parametros.size > 2) continue;
      if (!facetas[tipo].has(id)) facetas[tipo].set(id, nome);
    }
  }

  return facetas;
}

/** Os cartões de produto de uma página de listagem. */
function lerCartoes(html) {
  const cartoes = [];
  const regex =
    /<a\s+href="([^"]*\/pt-BR\/produtos\/[^"]+)"\s*\n?\s*class="block">([\s\S]*?)<\/a>/g;

  for (const [, href, interno] of html.matchAll(regex)) {
    const imagem = interno.match(/src="([^"]*\/storage\/[^"]+)"/)?.[1];
    const nome = interno.match(
      /<div class="text-center text-base font-semibold font-bricolage[^"]*">([\s\S]*?)<\/div>/,
    )?.[1];

    if (!imagem || !nome) continue;

    cartoes.push({
      url: new URL(href.replace(/&amp;/g, "&"), ORIGEM).toString(),
      imagem,
      nome: limparTexto(nome),
    });
  }

  return cartoes;
}

function lerTotalDePaginas(html) {
  let total = 1;
  // O paginador escreve `&amp;page=2` no href; sem desescapar, o `&` some e a
  // varredura parava na primeira página de cada listagem.
  for (const [, numero] of html.replace(/&amp;/g, "&").matchAll(/[?&]page=(\d+)/g)) {
    total = Math.max(total, Number(numero));
  }
  return total;
}

/** A família é o primeiro trecho da URL: /produtos/<familia>/<sku>. */
function familiaDaUrl(url) {
  const partes = new URL(url).pathname.split("/").filter(Boolean);
  const indice = partes.indexOf("produtos");
  return partes[indice + 1] ?? null;
}

function lerBlocoDeVariantes(html, titulo) {
  const inicio = html.indexOf(`>${titulo}</h5>`);
  if (inicio === -1) return [];

  const trecho = html.slice(inicio, inicio + 6000);
  const fim = trecho.indexOf("<hr");
  const bloco = fim === -1 ? trecho : trecho.slice(0, fim);

  const variantes = [];
  for (const [, href, interno] of bloco.matchAll(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const rotulo = limparTexto(interno);
    if (!rotulo || !href.includes("/produtos/")) continue;
    variantes.push({ rotulo, url: new URL(href.replace(/&amp;/g, "&"), ORIGEM).toString() });
  }

  return variantes;
}

/** O trecho entre um título de seção e o próximo `<h2>`. */
function recortarSecao(html, titulo) {
  const inicio = html.indexOf(titulo);
  if (inicio === -1) return "";

  const resto = html.slice(inicio + titulo.length);
  const fim = resto.indexOf("<h2");
  return fim === -1 ? resto : resto.slice(0, fim);
}

/** Tudo o que a página de um SKU informa. */
function lerProduto(html, url) {
  const nome = html.match(
    /<h1 class="text-2xl md:text-4xl font-bold[^"]*">([\s\S]*?)<\/h1>/,
  )?.[1];
  const imagem = html.match(/src="([^"]*\/storage\/PIM_[^"]+)"\s*\n?\s*alt="Imagem do produto/)?.[1];
  const nomeSku = html.match(/alt="Imagem do produto ([^"]*)"/)?.[1];

  if (!nome || !imagem) return null;

  const resumo = html.match(
    /<p class="text-base mb-6 opacity-80[^"]*">([\s\S]*?)<\/p>/,
  )?.[1];
  const descricao = html.match(
    /<p class="max-w-3xl mx-auto mb-8 text-center[^"]*">([\s\S]*?)<\/p>/,
  )?.[1];
  const palavras = html.match(
    /<div\s*\n?\s*class="uppercase tracking-widest[^"]*">([\s\S]*?)<\/div>/,
  )?.[1];

  // "Onde aplicar?" é um carrossel de superfícies. O corte no próximo <h2>
  // existe porque mais abaixo a página repete a mesma marcação nas notícias.
  const secaoAplicacoes = recortarSecao(html, "Onde aplicar?");
  const aplicacoes = [
    ...secaoAplicacoes.matchAll(
      /<h3 class="leading-6 sm:leading-\[32px\] text-xl text-white font-bold font-bricolage[^"]*">([\s\S]*?)<\/h3>/g,
    ),
  ].map(([, texto]) => limparTexto(texto));

  const modoUso = recortarSecao(html, "Modo uso").match(/<p[^>]*x-show[^>]*>([\s\S]*?)<\/p>/)?.[1];
  const marcaPagina = html.match(/Conheça mais produtos ([^<]+)<\/h2>/)?.[1];

  const textos = [resumo, descricao].map((texto) => (texto ? limparTexto(texto) : ""));
  const nomeLimpo = limparTexto(nome);

  return {
    url,
    familia: familiaDaUrl(url),
    nome: capitalizar(recuperarAcentos(nomeLimpo, textos)),
    nomeSku: nomeSku ? capitalizar(recuperarAcentos(limparTexto(nomeSku), textos)) : null,
    marcaPagina: marcaPagina ? limparTexto(marcaPagina) : null,
    modoUso: modoUso ? limparTexto(modoUso) : "",
    imagem,
    resumo: resumo ? limparTexto(resumo) : "",
    descricao: descricao ? limparTexto(descricao) : "",
    palavras: palavras
      ? limparTexto(palavras)
          .split(/\s*[✦✧]\s*|\s*&#x2726;\s*/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
    aplicacoes: [...new Set(aplicacoes)].slice(0, 12),
    embalagens: lerBlocoDeVariantes(html, " Embalagens"),
    fragrancias: lerBlocoDeVariantes(html, " Fragrâncias"),
  };
}

// ---------------------------------------------------------------------------
// Varreduras
// ---------------------------------------------------------------------------

/**
 * Descobre marcas, categorias e ambientes.
 *
 * A barra lateral só mostra os filtros que fazem sentido para o setor aberto,
 * então a lista completa é a união dos três setores. Cada filtro é varrido
 * depois SEM o setor junto: com os dois na URL, um produto "para empresa" de
 * uma categoria descoberta em "para casa" ficava sem classificação nenhuma.
 */
async function mapearFacetas() {
  const facetas = { marca: new Map(), categoria: new Map(), ambiente: new Map() };

  // A listagem de um setor inteiro: é ela que diz a que setor cada produto
  // pertence, sem depender de marca ou categoria nenhuma.
  const listagens = SETORES.map((setor) => ({
    tipo: "setor",
    id: setor.id,
    nome: setor.nome,
  }));

  for (const setor of SETORES) {
    const html = await baixarHtml(`${ORIGEM}/pt-BR/produtos?setor=${setor.id}`);
    const doSetor = lerFacetas(html);

    for (const tipo of ["marca", "categoria", "ambiente"]) {
      for (const [id, nome] of doSetor[tipo]) {
        facetas[tipo].set(id, nome);
        // Com o setor junto, que é como o filtro aparece na origem…
        listagens.push({ tipo, id, nome, setor: setor.id });
      }
    }
  }

  // …e sem o setor, porque a origem devolve conjuntos diferentes nos dois
  // casos: há categoria que só responde com o setor na URL e há produto que só
  // aparece sem ele. A união das duas varreduras é o que fecha a conta.
  for (const tipo of ["marca", "categoria", "ambiente"]) {
    for (const [id, nome] of facetas[tipo]) listagens.push({ tipo, id, nome });
  }

  return { facetas, listagens };
}

/** Percorre uma listagem inteira (todas as páginas) e devolve os cartões. */
async function varrerListagem({ tipo, id, setor }) {
  const base = `${ORIGEM}/pt-BR/produtos?${tipo}=${id}${setor ? `&setor=${setor}` : ""}`;
  const primeira = await baixarHtml(base);
  const paginas = lerTotalDePaginas(primeira);
  const cartoes = lerCartoes(primeira);

  for (let pagina = 2; pagina <= paginas; pagina += 1) {
    const html = await baixarHtml(`${base}&page=${pagina}`);
    cartoes.push(...lerCartoes(html));
  }

  return cartoes;
}

async function lerSitemap() {
  const resposta = await fetch(`${ORIGEM}/sitemap.xml`, { headers: UA });
  const xml = await resposta.text();
  const urls = new Set();

  for (const [, url] of xml.matchAll(
    /(https:\/\/www\.startquimica\.com\.br\/pt-BR\/produtos\/[^<"\s]+)/g,
  )) {
    urls.add(url.replace(/["<].*$/, ""));
  }

  return [...urls];
}

// ---------------------------------------------------------------------------
// Imagens
// ---------------------------------------------------------------------------

function nomeDaImagem(urlImagem) {
  const arquivo = urlImagem.split("/").pop() ?? "";
  const id = arquivo.replace(/^PIM_/, "").replace(/\.\w+$/, "");
  return `${id}.webp`;
}

async function baixarImagem(urlImagem) {
  const destino = path.join(DESTINO_IMG, nomeDaImagem(urlImagem));
  if (fs.existsSync(destino)) return fs.statSync(destino).size;

  const resposta = await fetch(urlImagem, { headers: UA });
  if (!resposta.ok) throw new Error(`HTTP ${resposta.status} na imagem ${urlImagem}`);

  const original = Buffer.from(await resposta.arrayBuffer());
  const otimizada = await sharp(original)
    .resize({ height: ALTURA_IMAGEM, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: QUALIDADE, effort: 6 })
    .toBuffer();

  // Recomprimir imagem pequena às vezes engorda; nesse caso fica a original.
  const melhor = otimizada.length < original.length ? otimizada : original;
  fs.writeFileSync(destino, melhor);
  return melhor.length;
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

async function principal() {
  console.log("1/5  Mapeando filtros do catálogo…");
  const { facetas, listagens } = await mapearFacetas();
  console.log(
    `     ${facetas.marca.size} marcas · ${facetas.categoria.size} categorias · ${facetas.ambiente.size} ambientes`,
  );

  console.log(`2/5  Varrendo ${listagens.length} listagens…`);
  const porFamilia = new Map();

  const resultados = await emLote(listagens, varrerListagem, "listagens");

  resultados.forEach((cartoes, indice) => {
    if (!cartoes) return;
    const { tipo, id, nome, setor } = listagens[indice];

    for (const cartao of cartoes) {
      const familia = familiaDaUrl(cartao.url);
      if (!familia) continue;

      if (!porFamilia.has(familia)) {
        porFamilia.set(familia, {
          marcas: new Set(),
          categorias: new Set(),
          ambientes: new Set(),
          setores: new Set(),
        });
      }

      const registro = porFamilia.get(familia);
      if (setor) registro.setores.add(setor);
      if (tipo === "setor") registro.setores.add(id);
      if (tipo === "marca") registro.marcas.add(nome);
      if (tipo === "categoria") registro.categorias.add(nome);
      if (tipo === "ambiente") registro.ambientes.add(nome);
    }
  });

  console.log(`     ${porFamilia.size} famílias classificadas`);

  console.log("3/5  Lendo as páginas de cada produto…");
  const urls = (await lerSitemap()).slice(0, LIMITE);
  const paginas = await emLote(
    urls,
    async (url) => lerProduto(await baixarHtml(url), url),
    "produtos",
  );

  const familias = new Map();

  for (const produto of paginas) {
    if (!produto?.familia) continue;

    if (!familias.has(produto.familia)) {
      familias.set(produto.familia, {
        slug: produto.familia,
        nome: produto.nome,
        resumo: produto.resumo,
        descricao: produto.descricao,
        palavras: produto.palavras,
        aplicacoes: produto.aplicacoes,
        modoUso: produto.modoUso,
        marcaPagina: produto.marcaPagina,
        variantes: [],
        origem: produto.url,
      });
    }

    const familia = familias.get(produto.familia);
    // A família herda o texto mais completo entre os SKUs.
    if (produto.descricao.length > familia.descricao.length) {
      familia.descricao = produto.descricao;
    }
    if (produto.resumo.length > familia.resumo.length) familia.resumo = produto.resumo;
    if (produto.modoUso.length > familia.modoUso.length) familia.modoUso = produto.modoUso;
    if (produto.aplicacoes.length > familia.aplicacoes.length) {
      familia.aplicacoes = produto.aplicacoes;
    }
    if (!familia.marcaPagina && produto.marcaPagina) familia.marcaPagina = produto.marcaPagina;

    const rotuloFragrancia = produto.fragrancias.find((f) => f.url === produto.url)?.rotulo;
    const rotuloEmbalagem = produto.embalagens.find((e) => e.url === produto.url)?.rotulo;

    familia.variantes.push({
      nome: produto.nomeSku ?? produto.nome,
      fragrancia: rotuloFragrancia ?? null,
      embalagem: rotuloEmbalagem ?? null,
      imagem: produto.imagem,
      origem: produto.url,
    });
  }

  console.log(`     ${familias.size} famílias · ${paginas.filter(Boolean).length} SKUs`);

  console.log("4/5  Baixando e otimizando imagens…");
  fs.mkdirSync(DESTINO_IMG, { recursive: true });

  const imagens = [
    ...new Set([...familias.values()].flatMap((f) => f.variantes.map((v) => v.imagem))),
  ];
  const tamanhos = await emLote(imagens, baixarImagem, "imagens");
  const total = tamanhos.filter(Boolean).reduce((soma, valor) => soma + valor, 0);
  console.log(`     ${imagens.length} imagens · ${(total / 1024 / 1024).toFixed(1)} MB`);

  console.log("5/5  Gravando o catálogo…");

  const catalogo = [...familias.values()]
    .map((familia) => {
      const classificacao = porFamilia.get(familia.slug);
      const variantes = familia.variantes.map((variante) => ({
        ...variante,
        imagem: `/images/produtos/${nomeDaImagem(variante.imagem)}`,
      }));

      return {
        slug: familia.slug,
        nome: familia.nome,
        // A marca vem do filtro da origem; quando o produto não aparece em
        // nenhuma listagem, sobra o "Conheça mais produtos X" da própria página.
        marca: [...(classificacao?.marcas ?? [])][0] ?? familia.marcaPagina ?? null,
        setores: [...(classificacao?.setores ?? [])],
        categorias: [...(classificacao?.categorias ?? [])],
        ambientes: [...(classificacao?.ambientes ?? [])],
        resumo: familia.resumo,
        descricao: familia.descricao,
        modoUso: familia.modoUso,
        palavras: familia.palavras,
        aplicacoes: familia.aplicacoes,
        imagem: variantes[0]?.imagem ?? null,
        variantes,
        origem: familia.origem,
      };
    })
    .filter((produto) => produto.imagem)
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  const marcas = [...new Set(catalogo.map((p) => p.marca).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
  const categorias = [...new Set(catalogo.flatMap((p) => p.categorias))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
  const ambientes = [...new Set(catalogo.flatMap((p) => p.ambientes))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );

  fs.writeFileSync(
    DESTINO_JSON,
    `${JSON.stringify(
      {
        atualizadoEm: new Date().toISOString().slice(0, 10),
        fonte: `${ORIGEM}/pt-BR/produtos`,
        setores: SETORES,
        marcas,
        categorias,
        ambientes,
        produtos: catalogo,
      },
      null,
      2,
    )}\n`,
  );

  console.log(
    `\nPronto: ${catalogo.length} produtos, ${catalogo.reduce((s, p) => s + p.variantes.length, 0)} variantes.`,
  );
  console.log(`  ${DESTINO_JSON}`);
  console.log(`  ${DESTINO_IMG}/`);
}

principal().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
