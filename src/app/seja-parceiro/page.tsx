import type { Metadata } from "next";
import { PartnerForm } from "./PartnerForm";

export const metadata: Metadata = {
  title: "Seja um parceiro",
  description:
    "Fale com a equipe comercial da Rede Unishop e entenda investimento, implantação e suporte para abrir a sua unidade.",
  alternates: { canonical: "/seja-parceiro" },
};

export default function SejaParceiroPage() {
  return <PartnerForm />;
}
