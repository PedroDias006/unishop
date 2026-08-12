import type { Metadata } from "next";
import { InnerPage } from "@/components/inner/InnerPage";

export const metadata: Metadata = { title: "Modelo de negócio" };

export default function ModeloPage() {
  return <InnerPage eyebrow="Empreenda com a Unishop" title="Um caminho mais claro para abrir sua unidade." description="Página preparada para explicar investimento, implantação, suporte, treinamento e próximos passos." items={["Conheça o modelo", "Escolha da estrutura", "Análise da região", "Implantação da loja", "Treinamento", "Suporte contínuo"]} />;
}
