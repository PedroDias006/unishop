import catalogo from "./produtos.json";

/**
 * O catálogo completo da Start Química — a indústria do grupo, que fabrica
 * tudo o que a loja Unishop vende.
 *
 * O arquivo `produtos.json` é gerado por `scripts/importar-produtos.mjs` e não
 * deve ser editado à mão: rode o script de novo quando a origem mudar. Aqui
 * ficam só os tipos e os recortes que as telas usam.
 */

export type Variante = {
  nome: string;
  fragrancia: string | null;
  embalagem: string | null;
  imagem: string;
  origem: string;
};

export type Produto = {
  slug: string;
  nome: string;
  marca: string | null;
  setores: string[];
  categorias: string[];
  ambientes: string[];
  resumo: string;
  descricao: string;
  modoUso: string;
  palavras: string[];
  aplicacoes: string[];
  imagem: string;
  variantes: Variante[];
  origem: string;
};

export type Setor = { id: string; nome: string };

export const produtos = catalogo.produtos as Produto[];
export const setoresDoCatalogo = catalogo.setores as Setor[];
export const marcasDoCatalogo = catalogo.marcas as string[];
export const categoriasDoCatalogo = catalogo.categorias as string[];
export const ambientesDoCatalogo = catalogo.ambientes as string[];
export const catalogoAtualizadoEm = catalogo.atualizadoEm as string;

/**
 * O que a vitrine precisa para desenhar um cartão e filtrar.
 *
 * Descrição, modo de uso e aplicações ficam de fora de propósito: multiplicados
 * por centenas de produtos, eles sozinhos pesariam mais que o resto da página.
 * A ficha completa é carregada só quando alguém abre o produto.
 */
export type VarianteDaVitrine = { rotulo: string; imagem: string };

export type ProdutoDaVitrine = Pick<
  Produto,
  "slug" | "nome" | "marca" | "setores" | "categorias" | "ambientes" | "imagem"
> & { variantes: VarianteDaVitrine[]; busca: string };

/**
 * As variações que valem um botão no cartão: primeiro as fragrâncias (é o que
 * muda a foto), e só quando não há fragrância nenhuma é que entram os
 * tamanhos. Rótulos repetidos são descartados — a origem tem SKU de 6 unidades
 * e de 12 com a mesma embalagem e a mesma imagem.
 */
function resumirVariantes(produto: Produto): VarianteDaVitrine[] {
  const comFragrancia = produto.variantes.filter((variante) => variante.fragrancia);
  const escolhidas = comFragrancia.length > 0 ? comFragrancia : produto.variantes;
  const vistos = new Set<string>();
  const resumo: VarianteDaVitrine[] = [];

  for (const variante of escolhidas) {
    const rotulo =
      variante.fragrancia ??
      variante.embalagem ??
      diferencaDoNome(variante.nome, produto.nome);

    if (!rotulo || vistos.has(rotulo)) continue;
    vistos.add(rotulo);
    resumo.push({ rotulo, imagem: variante.imagem });
  }

  return resumo;
}

/**
 * O que sobra do nome do SKU depois de tirar as palavras que já estão no nome
 * da família: "Água Oxigenada Only 20V Cremosa" menos "Água Oxigenada Cremosa
 * Only" vira "20V", que é a etiqueta que o botão precisa. Nem todo produto da
 * origem tem fragrância ou embalagem preenchida — sem isso o botão mostraria o
 * nome inteiro repetido três vezes.
 */
function diferencaDoNome(nomeSku: string, nomeFamilia: string) {
  const base = new Set(normalizarBusca(nomeFamilia).split(/\s+/));
  const resto = nomeSku
    .split(/\s+/)
    .filter((palavra) => !base.has(normalizarBusca(palavra)));

  return resto.join(" ") || "Padrão";
}

export function montarVitrine(): ProdutoDaVitrine[] {
  return produtos.map((produto) => ({
    slug: produto.slug,
    nome: produto.nome,
    marca: produto.marca,
    setores: produto.setores,
    categorias: produto.categorias,
    ambientes: produto.ambientes,
    imagem: produto.imagem,
    variantes: resumirVariantes(produto),
    // Um campo só, já normalizado, para a busca não recalcular a cada tecla.
    busca: normalizarBusca(
      [produto.nome, produto.marca, ...produto.categorias, ...produto.palavras].join(" "),
    ),
  }));
}

export function normalizarBusca(valor: string) {
  return valor
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLocaleLowerCase("pt-BR");
}

/**
 * O nome exato da marca dentro do catálogo, a partir do apelido usado nas
 * telas. A origem escreve "Start PRO", a home escreve "StartPRO" e o showcase
 * escreve "Start Pro" — comparar sem acento, sem caixa e sem espaço resolve os
 * três sem obrigar ninguém a decorar a grafia da origem.
 */
export function marcaDoCatalogo(nome: string) {
  const alvo = normalizarBusca(nome).replace(/\s+/g, "");

  return (
    marcasDoCatalogo.find(
      (marca) => normalizarBusca(marca).replace(/\s+/g, "") === alvo,
    ) ?? null
  );
}

/** O endereço da vitrine já filtrada por uma marca. */
export function linkDaMarca(nome: string) {
  const marca = marcaDoCatalogo(nome);

  return marca
    ? `/produtos/catalogo?marca=${encodeURIComponent(marca)}`
    : "/produtos/catalogo";
}

export function acharProduto(slug: string) {
  return produtos.find((produto) => produto.slug === slug) ?? null;
}

/** Quantos produtos cada marca tem — usado nos filtros e nas seções de marca. */
export function contarPorMarca() {
  const contagem = new Map<string, number>();

  for (const produto of produtos) {
    if (!produto.marca) continue;
    contagem.set(produto.marca, (contagem.get(produto.marca) ?? 0) + 1);
  }

  return contagem;
}
