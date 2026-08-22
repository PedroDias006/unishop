/**
 * Dados de contato da rede.
 *
 * ⚠ Procedência de cada item — importante antes de publicar:
 *
 * - Endereço: é o que a própria empresa publica em `parceirounishop.com.br`
 *   (Av. Airton Borges da Silva, 501, Sala Escritório — Distrito Industrial,
 *   Uberlândia/MG, 38402-333). É o escritório central da rede.
 * - Telefones, WhatsApp e e-mail: saíram do "Fale conosco" da Start Química
 *   (`startquimica.com.br`), a indústria que abastece as lojas. A Rede Unishop
 *   não publica canais próprios em nenhum site oficial — por isso cada canal
 *   abaixo carrega um `note` dizendo de quem é o atendimento, para o visitante
 *   não achar que está ligando para a área comercial de expansão.
 *
 * Quando a empresa informar telefone, WhatsApp e e-mail comerciais próprios,
 * basta trocar os valores aqui: nenhum componente conhece esses dados de cor.
 */

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  note: string;
  external?: boolean;
};

export const headquarters = {
  legalName: "Unishop Comércio e Consultoria Ltda",
  label: "Escritório central da rede",
  street: "Av. Airton Borges da Silva, 501",
  complement: "Sala Escritório",
  district: "Distrito Industrial",
  city: "Uberlândia",
  state: "MG",
  postalCode: "38402-333",
} as const;

export const headquartersAddress = `${headquarters.street}, ${headquarters.complement} — ${headquarters.district}, ${headquarters.city} — ${headquarters.state}, ${headquarters.postalCode}`;

const mapQuery = encodeURIComponent(
  `${headquarters.street} - ${headquarters.district}, ${headquarters.city} - ${headquarters.state}, ${headquarters.postalCode}`,
);

/** Embed do Google Maps sem chave de API — carrega só quando o visitante rola até ele. */
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&hl=pt-BR&z=16&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
export const mapWazeUrl = `https://waze.com/ul?q=${mapQuery}&navigate=yes`;

/** Mensagem que já vai escrita quando o visitante abre o WhatsApp. */
const whatsappMessage = encodeURIComponent(
  "Olá! Vim pelo site da Rede Unishop e quero saber como abrir uma unidade.",
);

export const whatsappUrl = `https://wa.me/5534991361508?text=${whatsappMessage}`;

export const contactChannels: ContactChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "(34) 99136-1508",
    href: whatsappUrl,
    note: "Canal mais rápido — atendimento Start/Unishop",
    external: true,
  },
  {
    id: "email",
    label: "E-mail",
    value: "marketingdigital@startquimica.com.br",
    href: "mailto:marketingdigital@startquimica.com.br?subject=Quero%20abrir%20uma%20unidade%20Unishop",
    note: "Marketing da Start Química, indústria da rede",
  },
  {
    id: "telefone-uberlandia",
    label: "Telefone · Uberlândia (MG)",
    value: "(34) 3292-6100",
    href: "tel:+553432926100",
    note: "Mesma cidade do escritório central",
  },
  {
    id: "telefone-goiania",
    label: "Telefone · Goiânia (GO)",
    value: "(62) 3598-2050",
    href: "tel:+556235982050",
    note: "Unidade de Goiás",
  },
];

/** As 27 unidades federativas, na ordem em que o visitante espera achar. */
export const brazilianStates = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
] as const;

/** As opções vieram do formulário oficial de parceria da própria rede. */
export const occupationOptions = [
  "Trabalho como CLT",
  "Sou autônomo(a)",
  "Já tenho um negócio próprio",
  "Sou investidor(a)",
  "Sou servidor(a) público(a)",
  "Outra situação",
] as const;

/** As faixas acompanham os três formatos de loja (R$ 60 mil, R$ 86 mil, R$ 120 mil). */
export const investmentOptions = [
  "Até R$ 60 mil",
  "Entre R$ 60 mil e R$ 86 mil",
  "Entre R$ 86 mil e R$ 120 mil",
  "Acima de R$ 120 mil",
  "Ainda estou avaliando",
] as const;

export const timelineOptions = [
  "O quanto antes",
  "Nos próximos 3 meses",
  "Entre 3 e 6 meses",
  "Daqui a mais de 6 meses",
  "Só quero entender o modelo",
] as const;
