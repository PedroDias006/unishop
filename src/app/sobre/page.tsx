import type { Metadata } from "next";
import { AboutStory } from "@/components/about/AboutStory";

export const metadata: Metadata = {
  title: "Nossa história",
  description:
    "De uma fábrica de produtos automotivos em Uberlândia, em 1987, a uma rede nacional de lojas especializadas em limpeza profissional. Conheça a trajetória da Start Química e da Rede Unishop.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return <AboutStory />;
}
