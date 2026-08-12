import type { Metadata } from "next";
import { InnerPage } from "@/components/inner/InnerPage";

export const metadata: Metadata = { title: "Conteúdos" };

export default function ConteudosPage() {
  return <InnerPage eyebrow="Conteúdos" title="Informação útil para clientes e parceiros." description="Página preparada para blog, vídeos, materiais ricos e integração futura com WordPress headless." items={["Artigos recentes", "Categorias", "Vídeos", "Guias de limpeza", "Materiais para parceiros", "Integração com CMS"]} />;
}
