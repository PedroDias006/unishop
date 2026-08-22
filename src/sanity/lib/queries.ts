import type { PortableTextBlock } from "next-sanity";
import { consultar } from "./client";
import { urlDaImagem } from "./image";

/**
 * As consultas ao CMS, com os tipos que o site já usa.
 *
 * Toda função aqui devolve `null` quando o CMS não está configurado ou não
 * respondeu. Quem chama decide o que fazer — na prática, cai no conteúdo
 * versionado no repositório. É esse contrato que permite ligar o Sanity depois,
 * sem tocar em nenhuma tela.
 */

type ImagemDoCms = { asset?: { _ref?: string }; alt?: string } | null;

type PostDoCms = {
  slug: string;
  titulo: string;
  resumo: string;
  publicadoEm: string;
  capa: ImagemDoCms;
  capaAlt: string | null;
  corpo: PortableTextBlock[] | null;
  autor: { nome: string; cargo: string | null } | null;
  categorias: string[] | null;
  destaque: boolean | null;
};

export type PostPublicado = {
  slug: string;
  titulo: string;
  resumo: string;
  data: string;
  capa: string | null;
  capaAlt: string | null;
  minutos: number;
  corpo: PortableTextBlock[];
  autor: { nome: string; cargo: string | null } | null;
  categorias: string[];
  destaque: boolean;
};

const CAMPOS_DO_POST = `
  "slug": slug.current,
  titulo,
  resumo,
  publicadoEm,
  capa,
  "capaAlt": capa.alt,
  corpo,
  "autor": autor->{nome, "cargo": coalesce(cargo, null)},
  "categorias": categorias[]->nome,
  destaque
`;

/** Minutos de leitura a 200 palavras por minuto, contados no próprio texto. */
function minutosDeLeitura(corpo: PortableTextBlock[] | null) {
  if (!corpo) return 1;

  const palavras = corpo
    .flatMap((bloco) => {
      const filhos = (bloco as { children?: { text?: string }[] }).children ?? [];
      return filhos.map((filho) => filho.text ?? "");
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(palavras / 200));
}

function converter(post: PostDoCms): PostPublicado {
  return {
    slug: post.slug,
    titulo: post.titulo,
    resumo: post.resumo,
    data: post.publicadoEm,
    capa: urlDaImagem(post.capa, 1200),
    capaAlt: post.capaAlt ?? null,
    minutos: minutosDeLeitura(post.corpo),
    corpo: post.corpo ?? [],
    autor: post.autor,
    categorias: post.categorias ?? [],
    destaque: post.destaque ?? false,
  };
}

export async function postsDoCms(): Promise<PostPublicado[] | null> {
  const dados = await consultar<PostDoCms[]>(
    `*[_type == "post" && defined(slug.current)] | order(publicadoEm desc) { ${CAMPOS_DO_POST} }`,
  );

  if (!dados || dados.length === 0) return null;

  return dados.map(converter);
}

export async function postDoCms(slug: string): Promise<PostPublicado | null> {
  const dados = await consultar<PostDoCms | null>(
    `*[_type == "post" && slug.current == $slug][0] { ${CAMPOS_DO_POST} }`,
    { slug },
  );

  return dados ? converter(dados) : null;
}

// ---------------------------------------------------------------------------
// Conteúdo das páginas
// ---------------------------------------------------------------------------

export type DepoimentoDoCms = {
  nome: string;
  unidade: string | null;
  texto: string;
  foto: string | null;
};

export async function depoimentosDoCms() {
  const dados = await consultar<
    { nome: string; unidade: string | null; texto: string; foto: ImagemDoCms }[]
  >(
    `*[_type == "depoimento"] | order(ordem asc) { nome, unidade, texto, foto }`,
  );

  if (!dados || dados.length === 0) return null;

  return dados.map((item) => ({
    nome: item.nome,
    unidade: item.unidade,
    texto: item.texto,
    foto: urlDaImagem(item.foto, 240),
  })) satisfies DepoimentoDoCms[];
}

export async function faqDoCms() {
  const dados = await consultar<{ pergunta: string; resposta: string }[]>(
    `*[_type == "perguntaFrequente"] | order(ordem asc) { pergunta, resposta }`,
  );

  if (!dados || dados.length === 0) return null;

  return dados.map((item) => ({ question: item.pergunta, answer: item.resposta }));
}

export async function numerosDoCms(grupo: "rede" | "negocio") {
  const dados = await consultar<
    { valor: string; unidade: string | null; rotulo: string; detalhe: string | null }[]
  >(
    `*[_type == "numeroDaRede" && grupo == $grupo] | order(ordem asc) {
      valor, unidade, rotulo, detalhe
    }`,
    { grupo },
  );

  if (!dados || dados.length === 0) return null;

  return dados.map((item) => ({
    value: item.valor,
    unit: item.unidade ?? "",
    label: item.rotulo,
    detail: item.detalhe ?? "",
  }));
}

export async function pilaresDoCms() {
  const dados = await consultar<
    { identificador: string; titulo: string; texto: string }[]
  >(
    `*[_type == "pilarDaParceria"] | order(ordem asc) {
      "identificador": identificador.current, titulo, texto
    }`,
  );

  if (!dados || dados.length === 0) return null;

  return dados.map((item) => ({
    id: item.identificador,
    title: item.titulo,
    text: item.texto,
  }));
}
