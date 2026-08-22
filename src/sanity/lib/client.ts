import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, cmsAtivo, dataset, projectId } from "../env";

/**
 * O cliente do Sanity — ou `null`, quando o CMS ainda não foi configurado.
 *
 * O `null` é intencional e é o que sustenta o modo "sem CMS": quem consulta
 * verifica antes e cai no conteúdo do repositório. Sem isso, `createClient`
 * lançaria erro em tempo de build só por faltar uma variável de ambiente.
 */
export const sanityClient: SanityClient | null = cmsAtivo
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // CDN do Sanity: resposta em cache, que é o certo para conteúdo publicado.
      useCdn: true,
      perspective: "published",
    })
  : null;

/**
 * Faz a consulta e, em qualquer problema, devolve `null` em vez de derrubar a
 * página. Um post que não carrega é um post a menos na lista; uma exceção não
 * tratada é a home inteira fora do ar.
 */
export async function consultar<T>(
  query: string,
  parametros: Record<string, unknown> = {},
  /** Segundos até revalidar. O padrão vale para conteúdo editorial. */
  revalidar = 300,
): Promise<T | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, parametros, {
      next: { revalidate: revalidar },
    });
  } catch (erro) {
    console.error("[sanity] falha na consulta:", erro);
    return null;
  }
}
