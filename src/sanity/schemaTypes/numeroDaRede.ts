import { defineField, defineType } from "sanity";

/**
 * Um número da rede — "+500 lojas no Brasil", "18 a 24 meses de retorno".
 *
 * Ficam no CMS porque envelhecem: o número de lojas muda todo mês, e trocar
 * isso não pode depender de deploy. O `grupo` separa os números da rede (topo
 * da home) dos números do negócio (faixa do modelo de parceria).
 */
export const numeroDaRede = defineType({
  name: "numeroDaRede",
  title: "Número da rede",
  type: "document",
  fields: [
    defineField({
      name: "valor",
      title: "Número",
      type: "string",
      description: 'Ex.: "+500", "até 20%", "18 a 24".',
      validation: (regra) => regra.required(),
    }),
    defineField({ name: "unidade", title: "Unidade", type: "string" }),
    defineField({
      name: "rotulo",
      title: "Rótulo",
      type: "string",
      description: 'O que o número significa. Ex.: "lojas no Brasil".',
      validation: (regra) => regra.required(),
    }),
    defineField({
      name: "detalhe",
      title: "Detalhe",
      type: "string",
      description: "Linha de apoio, quando o número precisa de contexto.",
    }),
    defineField({
      name: "grupo",
      title: "Onde aparece",
      type: "string",
      options: {
        list: [
          { title: "Números da rede", value: "rede" },
          { title: "Números do negócio", value: "negocio" },
        ],
        layout: "radio",
      },
      initialValue: "rede",
      validation: (regra) => regra.required(),
    }),
    defineField({ name: "ordem", title: "Ordem", type: "number", initialValue: 10 }),
  ],
  orderings: [
    { title: "Ordem", name: "ordem", by: [{ field: "ordem", direction: "asc" }] },
  ],
  preview: { select: { title: "valor", subtitle: "rotulo" } },
});
