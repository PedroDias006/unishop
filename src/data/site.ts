import {
  BriefcaseBusiness,
  Building2,
  CarFront,
  Factory,
  Home,
  Shirt,
} from "lucide-react";

/**
 * Domínio público do site. Usado para canonical, Open Graph e sitemap.
 * Defina NEXT_PUBLIC_SITE_URL no ambiente para apontar a outro domínio
 * (staging, preview) sem alterar o código.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://redeunishop.com.br";

export const stats = [
  { value: "+500", label: "lojas no Brasil" },
  { value: "27", label: "estados atendidos" },
  { value: "+2 mil", label: "soluções disponíveis" },
  { value: "38 anos", label: "de experiência" },
];

export const benefits = [
  "Sem cobrança de royalties",
  "Treinamento comercial e operacional",
  "Suporte de marketing para a unidade",
  "Portfólio amplo para diferentes segmentos",
  "Condições comerciais competitivas",
  "Acompanhamento durante a implantação",
];

export const segments = [
  {
    name: "Casa",
    description: "Limpeza, organização e cuidado diário.",
    icon: Home,
  },
  {
    name: "Empresas",
    description: "Soluções para escritórios e comércios.",
    icon: BriefcaseBusiness,
  },
  {
    name: "Indústria",
    description: "Produtos para rotinas de alta exigência.",
    icon: Factory,
  },
  {
    name: "Automotivo",
    description: "Cuidados internos e externos para veículos.",
    icon: CarFront,
  },
  {
    name: "Lavanderia",
    description: "Tratamento de roupas e tecidos.",
    icon: Shirt,
  },
  {
    name: "Condomínios",
    description: "Manutenção eficiente de áreas comuns.",
    icon: Building2,
  },
];
