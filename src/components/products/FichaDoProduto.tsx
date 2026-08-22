"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Produto } from "@/data/produtos";
import { eventoProdutoVisto } from "@/lib/analytics";

/**
 * A foto do produto com as variações embaixo.
 *
 * Cada fragrância e cada embalagem da origem é um SKU com foto própria, então
 * trocar o botão troca a imagem — que é o que a pessoa quer conferir antes de
 * procurar na loja. Só esta parte é interativa; o resto da ficha é HTML.
 */
export function FichaDoProduto({
  produto,
  cenario,
}: {
  produto: Produto;
  cenario: string;
}) {
  const [ativa, setAtiva] = useState(0);
  const variante = produto.variantes[ativa] ?? produto.variantes[0];

  // `view_item` no GTM: é o que permite à agência montar remarketing por
  // produto e ver qual item do catálogo puxa tráfego.
  useEffect(() => {
    eventoProdutoVisto({
      slug: produto.slug,
      nome: produto.nome,
      marca: produto.marca,
      categoria: produto.categorias[0],
    });
  }, [produto.slug, produto.nome, produto.marca, produto.categorias]);

  const fragrancias = [
    ...new Map(
      produto.variantes
        .map((item, indice) => [item.fragrancia, indice] as const)
        .filter(([rotulo]) => rotulo),
    ).entries(),
  ] as [string, number][];

  const embalagens = [
    ...new Map(
      produto.variantes
        .map((item, indice) => [item.embalagem, indice] as const)
        .filter(([rotulo]) => rotulo),
    ).entries(),
  ] as [string, number][];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[28px] bg-slate-100">
        <Image
          src={cenario}
          alt=""
          fill
          unoptimized
          priority
          aria-hidden="true"
          sizes="(min-width: 1024px) 480px, 90vw"
          className="object-cover"
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.44)_58%,rgba(255,255,255,0.72)_100%)]" />
        <Image
          src={variante?.imagem ?? produto.imagem}
          alt={variante?.nome ?? produto.nome}
          fill
          unoptimized
          priority
          sizes="(min-width: 1024px) 480px, 90vw"
          className="z-[2] object-contain p-10 drop-shadow-[0_22px_28px_rgba(15,47,84,0.22)] sm:p-12"
        />
      </div>

      {fragrancias.length > 1 && (
        <GrupoDeVariantes
          titulo="Fragrâncias"
          opcoes={fragrancias}
          ativa={ativa}
          onEscolher={setAtiva}
        />
      )}

      {embalagens.length > 1 && (
        <GrupoDeVariantes
          titulo="Embalagens"
          opcoes={embalagens}
          ativa={ativa}
          onEscolher={setAtiva}
        />
      )}
    </div>
  );
}

function GrupoDeVariantes({
  titulo,
  opcoes,
  ativa,
  onEscolher,
}: {
  titulo: string;
  opcoes: [string, number][];
  ativa: number;
  onEscolher: (indice: number) => void;
}) {
  return (
    <div className="mt-6">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
        {titulo}
      </p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={titulo}>
        {opcoes.map(([rotulo, indice]) => (
          <button
            key={rotulo}
            type="button"
            onClick={() => onEscolher(indice)}
            aria-pressed={indice === ativa}
            className={`inline-flex min-h-10 items-center rounded-full border px-4 text-[13px] font-bold transition ${
              indice === ativa
                ? "border-transparent bg-[var(--brand-blue-900)] text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}
