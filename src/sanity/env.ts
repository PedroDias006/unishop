/**
 * Configuração do CMS.
 *
 * Tudo aqui é opcional de propósito: sem `NEXT_PUBLIC_SANITY_PROJECT_ID` o site
 * inteiro continua funcionando com o conteúdo que já está no repositório. O CMS
 * entra como fonte preferencial quando existe, e não como dependência — assim
 * um problema no Sanity nunca tira o site do ar.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * A API do Sanity é versionada por data: fixar aqui garante que uma mudança no
 * lado deles não altere a resposta de uma consulta que já está no ar.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-01";

/** Token de leitura, só necessário para conteúdo em rascunho. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

export const cmsAtivo = projectId.length > 0;
