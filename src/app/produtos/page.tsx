import type { Metadata } from "next";
import { ProductsLanding } from "@/components/products/ProductsLanding";
import { ChamadaParceiro, Vitrine } from "@/components/products/Vitrine";
import {
  ambientesDoCatalogo,
  categoriasDoCatalogo,
  marcasDoCatalogo,
  montarVitrine,
  setoresDoCatalogo,
} from "@/data/produtos";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Azulim, Tuff, Asseptgel, Start Pro e Pedrex: linhas completas de limpeza, higiene e cuidado para casa, comércio e indústria.",
  alternates: { canonical: "/produtos" },
};

type PaginaProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProdutosPage({ searchParams }: PaginaProps) {
  const parametros = await searchParams;
  const texto = (valor: string | string[] | undefined) =>
    typeof valor === "string" ? valor : "";
  const inicial = {
    marca: marcasDoCatalogo.includes(texto(parametros.marca))
      ? texto(parametros.marca)
      : "",
    setor: setoresDoCatalogo.some((setor) => setor.id === texto(parametros.setor))
      ? texto(parametros.setor)
      : "",
    categoria: categoriasDoCatalogo.includes(texto(parametros.categoria))
      ? texto(parametros.categoria)
      : "",
    ambiente: ambientesDoCatalogo.includes(texto(parametros.ambiente))
      ? texto(parametros.ambiente)
      : "",
    busca: texto(parametros.busca),
  };

  return (
    <>
      <ProductsLanding />
      <Vitrine
        key={JSON.stringify(inicial)}
        integrada
        produtos={montarVitrine()}
        setores={setoresDoCatalogo}
        marcas={marcasDoCatalogo}
        categorias={categoriasDoCatalogo}
        ambientes={ambientesDoCatalogo}
        inicial={inicial}
      />
      <ChamadaParceiro />
    </>
  );
}
