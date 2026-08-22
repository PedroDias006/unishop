import type { Metadata } from "next";
import { ChamadaParceiro, Vitrine } from "@/components/products/Vitrine";
import {
  ambientesDoCatalogo,
  categoriasDoCatalogo,
  marcasDoCatalogo,
  montarVitrine,
  produtos,
  setoresDoCatalogo,
} from "@/data/produtos";

export const metadata: Metadata = {
  title: "Catálogo de produtos",
  description:
    "O mix completo que abastece as lojas da Rede Unishop: limpeza, higiene, lavanderia, automotivo e linha profissional, marca a marca.",
  alternates: { canonical: "/produtos/catalogo" },
};

type PaginaProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * A vitrine grande. Os filtros aceitam vir pelo endereço — é assim que o
 * "ver linha" de cada marca chega aqui já mostrando só aquela marca.
 */
export default async function CatalogoPage({ searchParams }: PaginaProps) {
  const parametros = await searchParams;

  const texto = (valor: string | string[] | undefined) =>
    typeof valor === "string" ? valor : "";

  return (
    <>
      <Vitrine
        produtos={montarVitrine()}
        setores={setoresDoCatalogo}
        marcas={marcasDoCatalogo}
        categorias={categoriasDoCatalogo}
        ambientes={ambientesDoCatalogo}
        inicial={{
          marca: marcasDoCatalogo.includes(texto(parametros.marca)) ? texto(parametros.marca) : "",
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
        }}
      />

      <ChamadaParceiro />

      {/* O buscador precisa achar os produtos mesmo com a grade montada no
          navegador; esta lista é a mesma coisa em HTML, sem estilo. */}
      <div className="sr-only">
        <h2>Todos os produtos do catálogo</h2>
        <ul>
          {produtos.map((produto) => (
            <li key={produto.slug}>
              <a href={`/produtos/${produto.slug}`}>
                {produto.nome}
                {produto.marca ? ` — ${produto.marca}` : ""}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
