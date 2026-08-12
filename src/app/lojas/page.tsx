import type { Metadata } from "next";
import { InnerPage } from "@/components/inner/InnerPage";

export const metadata: Metadata = { title: "Lojas" };

export default function LojasPage() {
  return <InnerPage eyebrow="Encontre uma unidade" title="A Unishop mais próxima de você." description="Página preparada para mapa, busca por cidade, estado, rota, telefone e WhatsApp das unidades." items={["Busca por localização", "Mapa interativo", "Lista de unidades", "Página de cada loja", "Rotas e contato", "SEO local"]} />;
}
