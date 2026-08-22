import type { PortableTextBlock } from "next-sanity";
import { postDoCms, postsDoCms } from "@/sanity/lib/queries";
import dados from "./posts.json";

/**
 * Os posts do blog.
 *
 * Duas fontes, nesta ordem: o CMS, quando configurado e com pelo menos um post
 * publicado; e o JSON deste diretório, importado do WordPress antigo, que é o
 * que garante que o blog nunca fica vazio.
 *
 * A troca é silenciosa para quem chama — todo mundo recebe `Post[]`. O post do
 * CMS vem com `corpo` (rich text) e o do JSON com `blocos`; a tela sabe
 * renderizar os dois.
 */

export type Bloco =
  | { tipo: "titulo"; texto: string }
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "lista"; itens: string[] };

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  /** ISO curto: 2026-08-10 */
  data: string;
  capa: string | null;
  capaAlt?: string | null;
  minutos: number;
  /** Conteúdo do repositório. */
  blocos: Bloco[];
  /** Conteúdo do CMS. */
  corpo?: PortableTextBlock[];
  autor?: { nome: string; cargo: string | null } | null;
  categorias?: string[];
  destaque?: boolean;
};

/** O acervo versionado no repositório, do mais recente para o mais antigo. */
const postsDoRepositorio: Post[] = (dados as Post[])
  .slice()
  .sort((a, b) => b.data.localeCompare(a.data));

export async function listarPosts(): Promise<Post[]> {
  const doCms = await postsDoCms();

  if (!doCms) return postsDoRepositorio;

  return doCms.map((post) => ({
    slug: post.slug,
    titulo: post.titulo,
    resumo: post.resumo,
    data: post.data,
    capa: post.capa,
    capaAlt: post.capaAlt,
    minutos: post.minutos,
    blocos: [],
    corpo: post.corpo,
    autor: post.autor,
    categorias: post.categorias,
    destaque: post.destaque,
  }));
}

export async function buscarPost(slug: string): Promise<Post | undefined> {
  const doCms = await postDoCms(slug);

  if (doCms) {
    return {
      slug: doCms.slug,
      titulo: doCms.titulo,
      resumo: doCms.resumo,
      data: doCms.data,
      capa: doCms.capa,
      capaAlt: doCms.capaAlt,
      minutos: doCms.minutos,
      blocos: [],
      corpo: doCms.corpo,
      autor: doCms.autor,
      categorias: doCms.categorias,
      destaque: doCms.destaque,
    };
  }

  return postsDoRepositorio.find((post) => post.slug === slug);
}

/**
 * Posts sugeridos ao fim de um artigo: os vizinhos mais próximos na linha do
 * tempo, para nunca cair em um bloco vazio nem repetir o post atual.
 */
export async function relacionados(slug: string, quantidade = 3): Promise<Post[]> {
  const todos = await listarPosts();
  const indice = todos.findIndex((post) => post.slug === slug);

  if (indice < 0) return todos.slice(0, quantidade);

  return [...todos.slice(indice + 1), ...todos.slice(0, indice)].slice(0, quantidade);
}

const formatador = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatarData(iso: string) {
  return formatador.format(new Date(`${iso}T12:00:00Z`));
}
