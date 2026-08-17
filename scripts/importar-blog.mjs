/**
 * Importa os posts do blog WordPress (redeunishop.com.br) para o conteúdo
 * local deste projeto.
 *
 *   node scripts/importar-blog.mjs            # importa os 24 mais recentes
 *   node scripts/importar-blog.mjs 40         # importa os 40 mais recentes
 *
 * Gera:
 *   src/content/blog/posts.json        metadados + corpo dos artigos
 *   public/images/blog/*.webp          capas otimizadas
 *
 * A API REST do WordPress está bloqueada (403), então a leitura é feita a
 * partir do HTML público e do wp-sitemap.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);

const ORIGEM = "https://redeunishop.com.br";
const LIMITE = Number(process.argv[2] || 24);
const UA = { "User-Agent": "Mozilla/5.0 (compatible; unishop-import/1.0)" };

const DESTINO_JSON = "src/content/blog/posts.json";
const DESTINO_IMG = "public/images/blog";

async function baixar(url) {
  const resposta = await fetch(url, { headers: UA });
  if (!resposta.ok) throw new Error(`${resposta.status} em ${url}`);
  return resposta.text();
}

function limpar(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fatiar(html, inicio) {
  // Recorta um elemento equilibrando as <div> a partir do índice informado.
  const abre = html.indexOf(">", inicio) + 1;
  let profundidade = 1;
  const re = /<(\/?)div\b/gi;
  re.lastIndex = abre;
  let m;
  while ((m = re.exec(html))) {
    profundidade += m[1] ? -1 : 1;
    if (profundidade === 0) return html.slice(abre, m.index);
  }
  return html.slice(abre);
}

function extrairBlocos(corpo) {
  const blocos = [];
  const re = /<(h[2-6]|p|ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;

  while ((m = re.exec(corpo))) {
    const tag = m[1].toLowerCase();
    const bruto = m[2];

    if (tag === "ul" || tag === "ol") {
      const itens = [...bruto.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((li) => limpar(li[1]))
        .filter(Boolean);
      if (itens.length) blocos.push({ tipo: "lista", itens });
      continue;
    }

    const texto = limpar(bruto);
    if (!texto || texto.length < 2) continue;
    // Os títulos internos do tema usam h5; viram h2 na nossa hierarquia.
    blocos.push({ tipo: /^h[2-6]$/.test(tag) ? "titulo" : "paragrafo", texto });
  }

  return blocos;
}

/** Elementos do tema que aparecem soltos no meio do conteúdo. */
const LIXO = /^(categorias?\s*\/|tags?\s*\/|por equipe unishop)/i;
/** A partir daqui é rodapé do tema — o artigo acabou. */
const FIM = /^(compartilhe esse artigo|compartilhar|leia também|posts? relacionados)/i;

function podar(blocos) {
  const texto = (b) => (b.tipo === "lista" ? "" : b.texto);
  const fim = blocos.findIndex((b) => FIM.test(texto(b)));
  return (fim >= 0 ? blocos.slice(0, fim) : blocos).filter((b) => !LIXO.test(texto(b)));
}

function slugDe(url) {
  return url.replace(ORIGEM + "/", "").replace(/\/$/, "");
}

async function coletarCapas() {
  const mapa = new Map();
  const html = await baixar(`${ORIGEM}/blog/`);
  const re = /<a[^>]+href="https:\/\/redeunishop\.com\.br\/([a-z0-9-]{10,})\/"[^>]*>([\s\S]{0,900}?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const img = m[2].match(/<img[^>]+src="([^"]*\/uploads\/[^"]+)"/i);
    if (img && !mapa.has(m[1])) mapa.set(m[1], img[1]);
  }
  return mapa;
}

async function capaOtimizada(url, slug) {
  const nome = `${slug}.webp`;
  const destino = path.join(DESTINO_IMG, nome);
  if (fs.existsSync(destino)) return { arquivo: `/images/blog/${nome}`, reaproveitada: true };

  const resposta = await fetch(url, { headers: UA });
  if (!resposta.ok) return null;
  const entrada = Buffer.from(await resposta.arrayBuffer());

  const buffer = await sharp(entrada)
    .resize({ width: 1200, height: 675, fit: "cover", position: "attention" })
    .webp({ quality: 76, effort: 6 })
    .toBuffer();

  fs.mkdirSync(DESTINO_IMG, { recursive: true });
  fs.writeFileSync(destino, buffer);
  return { arquivo: `/images/blog/${nome}`, bytes: buffer.length };
}

function tempoDeLeitura(blocos) {
  const palavras = blocos.reduce(
    (total, b) =>
      total + (b.tipo === "lista" ? b.itens.join(" ") : b.texto).split(/\s+/).length,
    0,
  );
  return Math.max(1, Math.round(palavras / 200));
}

// ---------------------------------------------------------------- execução

console.log("Lendo o sitemap...");
const sitemap = await baixar(`${ORIGEM}/wp-sitemap-posts-post-1.xml`);
const entradas = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  .map(([, loc, lastmod]) => ({ url: loc, data: lastmod }))
  .sort((a, b) => b.data.localeCompare(a.data))
  .slice(0, LIMITE);

console.log(`${entradas.length} posts a importar.\nLendo as capas da listagem...`);
const capas = await coletarCapas();
console.log(`${capas.size} capas mapeadas.\n`);

const posts = [];

for (const [i, entrada] of entradas.entries()) {
  const slug = slugDe(entrada.url);

  try {
    const html = await baixar(entrada.url);
    const marca = html.search(/class="card-content-full"/i);
    if (marca < 0) throw new Error("corpo do artigo não encontrado");

    const corpo = fatiar(html, marca);
    const titulo =
      limpar((corpo.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i) || [])[1] || "") ||
      limpar((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/^Unishop \| /, "");

    let blocos = podar(extrairBlocos(corpo));
    // O h3 de abertura repete o título da página e o primeiro parágrafo é o
    // resumo — ambos saem do corpo do artigo.
    if (blocos[0]?.tipo === "titulo" && blocos[0].texto === titulo) blocos = blocos.slice(1);
    const resumo = blocos.find((b) => b.tipo === "paragrafo")?.texto ?? "";
    blocos = blocos.filter((b) => b.tipo === "lista" || b.texto !== resumo);
    if (!blocos.length) throw new Error("artigo sem parágrafos");

    const capaUrl = capas.get(slug);
    const capa = capaUrl ? await capaOtimizada(capaUrl, slug) : null;

    posts.push({
      slug,
      titulo,
      resumo,
      data: entrada.data.slice(0, 10),
      capa: capa?.arquivo ?? null,
      minutos: tempoDeLeitura(blocos),
      blocos,
    });

    console.log(
      `${String(i + 1).padStart(2)}/${entradas.length}  ${blocos.length} blocos  ` +
        `${capa ? "capa ok" : "SEM CAPA"}  ${slug.slice(0, 58)}`,
    );
  } catch (erro) {
    console.log(`${String(i + 1).padStart(2)}/${entradas.length}  FALHOU (${erro.message})  ${slug.slice(0, 48)}`);
  }
}

fs.mkdirSync(path.dirname(DESTINO_JSON), { recursive: true });
fs.writeFileSync(DESTINO_JSON, JSON.stringify(posts, null, 1));

console.log(
  `\n${posts.length} posts gravados em ${DESTINO_JSON} ` +
    `(${(fs.statSync(DESTINO_JSON).size / 1024).toFixed(0)} KB).`,
);
