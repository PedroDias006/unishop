import type { Metadata } from "next";
import { InnerPage } from "@/components/inner/InnerPage";

export const metadata: Metadata = { title: "Sobre" };

export default function SobrePage() {
  return <InnerPage eyebrow="Sobre a rede" title="Uma história de experiência, presença e relacionamento." description="Página preparada para apresentar trajetória, estrutura, valores e diferenciais da Rede Unishop." items={["História da empresa", "Números da rede", "Missão e valores", "Estrutura de suporte", "Presença nacional", "Marcas e parceiros"]} />;
}
