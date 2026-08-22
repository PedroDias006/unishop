import { normalizarBusca, type Produto } from "@/data/produtos";

type ProdutoComCenario = Pick<
  Produto,
  "slug" | "nome" | "marca" | "categorias" | "ambientes"
>;

/**
 * Três ambientes por família de uso. Os caminhos apontam para WebPs pequenos
 * e compartilhados: centenas de cartões ganham variedade sem baixar centenas
 * de fotografias diferentes no telefone.
 */
const CENARIOS = {
  casa: [
    "/images/produtos-contexto/casa.webp",
    "/images/produtos-contexto/casa-cozinha.webp",
    "/images/produtos-contexto/casa-sala.webp",
  ],
  lavanderia: [
    "/images/produtos-contexto/lavanderia.webp",
    "/images/produtos-contexto/lavanderia-clara.webp",
    "/images/produtos-contexto/lavanderia-tecidos.webp",
  ],
  higiene: [
    "/images/produtos-contexto/higiene.webp",
    "/images/produtos-contexto/higiene-clinica.webp",
    "/images/produtos-contexto/higiene-laboratorio.webp",
  ],
  pisos: [
    "/images/produtos-contexto/pisos.webp",
    "/images/produtos-contexto/pisos-lobby.webp",
    "/images/produtos-contexto/pisos-patio.webp",
  ],
  profissional: [
    "/images/produtos-contexto/profissional.webp",
    "/images/produtos-contexto/profissional-hotel.webp",
    "/images/produtos-contexto/profissional-industria.webp",
  ],
  automotivo: [
    "/images/produtos-contexto/automotivo.webp",
    "/images/produtos-contexto/automotivo-estudio.webp",
    "/images/produtos-contexto/automotivo-garagem.webp",
  ],
  piscina: [
    "/images/produtos-contexto/piscina.webp",
    "/images/produtos-contexto/piscina-tropical.webp",
    "/images/produtos-contexto/piscina-spa.webp",
  ],
  cuidados: [
    "/images/produtos-contexto/cuidados-pessoais.webp",
    "/images/produtos-contexto/cuidados-salao.webp",
    "/images/produtos-contexto/cuidados-botanico.webp",
  ],
  pet: [
    "/images/produtos-contexto/pet.webp",
    "/images/produtos-contexto/pet-casa.webp",
    "/images/produtos-contexto/pet-grooming.webp",
  ],
  cozinha: [
    "/images/produtos-contexto/cozinha-profissional.webp",
    "/images/produtos-contexto/cozinha-padaria.webp",
    "/images/produtos-contexto/cozinha-lavagem.webp",
  ],
} as const;

function escolherCenario(cenarios: readonly string[], slug: string) {
  let hash = 0;

  for (let indice = 0; indice < slug.length; indice += 1) {
    hash = (hash * 31 + slug.charCodeAt(indice)) >>> 0;
  }

  return cenarios[hash % cenarios.length];
}

/**
 * A família vem do uso real do produto; o slug escolhe uma das três fotos.
 * Como a escolha é determinística, cartão e página interna nunca discordam.
 */
export function cenarioDoProduto(produto: ProdutoComCenario) {
  const identidade = normalizarBusca(
    [produto.nome, produto.marca, ...produto.categorias].join(" "),
  );
  const ambientes = normalizarBusca(produto.ambientes.join(" "));
  const contem = (...termos: string[]) =>
    termos.some((termo) => identidade.includes(termo));

  let familia: keyof typeof CENARIOS = "casa";

  if (contem("aquapool", "tratamento de aguas", "flotador")) {
    familia = "piscina";
  } else if (contem("automotiv", "indy cryl")) {
    familia = "automotivo";
  } else if (contem("free pet")) {
    familia = "pet";
  } else if (
    contem(
      "biohair",
      "biokidz",
      "blushave",
      "only",
      "cabelo",
      "corpo e banho",
      "maos e pes",
      "linha infantil",
    )
  ) {
    familia = "cuidados";
  } else if (contem("alimenticia", "qualifood", "qualimilk", "laticinio")) {
    familia = "cozinha";
  } else if (contem("lavanderia", "amaciante", "sabao", "alvejante", "tuff")) {
    familia = "lavanderia";
  } else if (contem("start pro", "startpro", "indy pro")) {
    familia = "profissional";
  } else if (
    contem(
      "tratamento de pisos",
      "pedrex",
      "cera",
      "revitalizador",
      "manutencao predial",
    )
  ) {
    familia = "pisos";
  } else if (contem("assepsia", "hospitalar", "assept", "gelalcool")) {
    familia = "higiene";
  } else if (ambientes.includes("banheiro")) {
    familia = "higiene";
  }

  return escolherCenario(CENARIOS[familia], produto.slug);
}
