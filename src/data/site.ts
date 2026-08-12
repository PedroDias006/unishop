import {
  BriefcaseBusiness,
  Building2,
  CarFront,
  Factory,
  Home,
  Shirt,
} from "lucide-react";

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

export const storeModels = [
  {
    name: "Unishop Compacta",
    investment: "A partir de R$ 60 mil",
    description:
      "Uma operação enxuta para cidades menores ou pontos comerciais estratégicos.",
    area: "40–60 m²",
    team: "2–3 pessoas",
    tag: "Entrada acessível",
  },
  {
    name: "Unishop Intermediária",
    investment: "A partir de R$ 86 mil",
    description:
      "Equilíbrio entre exposição de produtos, estoque e atendimento consultivo.",
    area: "70–100 m²",
    team: "3–5 pessoas",
    tag: "Mais procurada",
  },
  {
    name: "Unishop Completa",
    investment: "A partir de R$ 120 mil",
    description:
      "Estrutura ampla para atender consumidores, empresas e clientes profissionais.",
    area: "120 m² ou mais",
    team: "5+ pessoas",
    tag: "Maior potencial",
  },
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
