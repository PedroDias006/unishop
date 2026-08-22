import createImageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { cmsAtivo, dataset, projectId } from "../env";

const construtor = cmsAtivo ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * A URL de uma imagem do CMS, já no tamanho que a tela usa.
 *
 * O Sanity redimensiona e converte para webp do lado dele, então a imagem que
 * chega ao navegador não passa pelo otimizador do Next nem pesa mais do que o
 * necessário — mesmo critério das imagens do catálogo.
 */
export function urlDaImagem(
  fonte: SanityImageSource | null | undefined,
  largura = 1200,
) {
  if (!fonte || !construtor) return null;

  return construtor.image(fonte).width(largura).auto("format").quality(75).url();
}
