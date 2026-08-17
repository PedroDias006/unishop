import type { Metadata } from "next";
import { BusinessOpportunityPage } from "@/components/business/BusinessOpportunityPage";

export const metadata: Metadata = {
  // O template do layout já acrescenta "| Rede Unishop".
  title: "Modelo de negócio",
  description:
    "Conheça os modelos de negócio Unishop, compare investimentos e descubra qual estrutura combina com o seu projeto.",
  alternates: { canonical: "/modelo-de-negocio" },
};

export default function ModeloPage() {
  return <BusinessOpportunityPage />;
}