import dados from "./posts.json";

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
  minutos: number;
  blocos: Bloco[];
};

/** Do mais recente para o mais antigo. */
export const posts: Post[] = (dados as Post[])
  .slice()
  .sort((a, b) => b.data.localeCompare(a.data));

export function buscarPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * Posts sugeridos ao fim de um artigo: os vizinhos mais próximos na linha do
 * tempo, para nunca cair em um bloco vazio nem repetir o post atual.
 */
export function relacionados(slug: string, quantidade = 3): Post[] {
  const indice = posts.findIndex((post) => post.slug === slug);
  if (indice < 0) return posts.slice(0, quantidade);

  return [...posts.slice(indice + 1), ...posts.slice(0, indice)].slice(0, quantidade);
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
