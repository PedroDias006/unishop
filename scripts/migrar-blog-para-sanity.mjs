/**
 * Leva os posts que estão no repositório para dentro do Sanity.
 *
 *   node scripts/migrar-blog-para-sanity.mjs --teste   # mostra o que faria
 *   node scripts/migrar-blog-para-sanity.mjs           # grava de verdade
 *
 * Depois disso o time de marketing edita os artigos antigos pelo painel, e não
 * mais por commit. Enquanto a migração não roda, o site continua servindo os
 * mesmos posts a partir de `src/content/blog/posts.json` — as duas fontes
 * convivem, com o CMS na frente.
 *
 * Precisa de um token com permissão de escrita:
 *
 *   sanity.io/manage → API → Tokens → Editor
 *   SANITY_API_WRITE_TOKEN=... node scripts/migrar-blog-para-sanity.mjs
 *
 * É idempotente: o `_id` de cada documento vem do slug, então rodar de novo
 * atualiza o que já existe em vez de duplicar.
 */
import { createClient } from "@sanity/client";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const TESTE = process.argv.includes("--teste");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}

if (!token && !TESTE) {
  console.error("Falta SANITY_API_WRITE_TOKEN (use --teste para simular).");
  process.exit(1);
}

const cliente = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-01",
  useCdn: false,
});

const posts = JSON.parse(fs.readFileSync("src/content/blog/posts.json", "utf8"));

/** Cada bloco do Portable Text precisa de uma chave estável. */
function chave(semente) {
  return crypto.createHash("sha1").update(semente).digest("hex").slice(0, 12);
}

function paragrafo(texto, semente, estilo = "normal") {
  return {
    _type: "block",
    _key: chave(semente),
    style: estilo,
    markDefs: [],
    children: [{ _type: "span", _key: chave(`${semente}-span`), text: texto, marks: [] }],
  };
}

/** Os blocos do JSON viram Portable Text — é o formato que o painel edita. */
function converterCorpo(post) {
  const corpo = [];

  post.blocos.forEach((bloco, indice) => {
    const semente = `${post.slug}-${indice}`;

    if (bloco.tipo === "titulo") {
      corpo.push(paragrafo(bloco.texto, semente, "h2"));
      return;
    }

    if (bloco.tipo === "lista") {
      bloco.itens.forEach((item, i) => {
        corpo.push({
          ...paragrafo(item, `${semente}-${i}`),
          listItem: "bullet",
          level: 1,
        });
      });
      return;
    }

    corpo.push(paragrafo(bloco.texto, semente));
  });

  return corpo;
}

/** Sobe a capa uma vez por post e devolve a referência do arquivo. */
async function subirCapa(post) {
  if (!post.capa) return null;

  const caminho = path.join("public", post.capa.replace(/^\//, ""));
  if (!fs.existsSync(caminho)) {
    console.warn(`  ! capa não encontrada: ${caminho}`);
    return null;
  }

  if (TESTE) return { _type: "image", asset: { _ref: "(simulado)" } };

  const arquivo = await cliente.assets.upload("image", fs.createReadStream(caminho), {
    filename: path.basename(caminho),
  });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: arquivo._id },
    alt: post.titulo,
  };
}

async function principal() {
  console.log(
    `${TESTE ? "[simulação] " : ""}Migrando ${posts.length} posts para ${projectId}/${dataset}…\n`,
  );

  const autor = {
    _id: "autor-equipe-unishop",
    _type: "autor",
    nome: "Equipe Unishop",
    cargo: "Rede Unishop",
  };

  if (!TESTE) await cliente.createOrReplace(autor);

  for (const post of posts) {
    const capa = await subirCapa(post);

    const documento = {
      _id: `post-${post.slug}`,
      _type: "post",
      titulo: post.titulo,
      slug: { _type: "slug", current: post.slug },
      resumo: post.resumo,
      publicadoEm: post.data,
      autor: { _type: "reference", _ref: autor._id },
      destaque: false,
      corpo: converterCorpo(post),
      ...(capa ? { capa } : {}),
    };

    if (TESTE) {
      console.log(
        `  ${post.slug} — ${documento.corpo.length} blocos${capa ? " + capa" : ""}`,
      );
      continue;
    }

    await cliente.createOrReplace(documento);
    console.log(`  ✓ ${post.slug}`);
  }

  console.log(
    `\n${TESTE ? "Simulação concluída." : "Pronto."} O site passa a ler do CMS assim que houver post publicado.`,
  );
}

principal().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
