import type { Metadata } from "next";
import { ProductsLanding } from "@/components/products/ProductsLanding";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Azulim, Tuff, Asseptgel, Start Pro e Pedrex: linhas completas de limpeza, higiene e cuidado para casa, comércio e indústria.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return <ProductsLanding />;
}
