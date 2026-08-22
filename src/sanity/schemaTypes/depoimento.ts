import { defineField, defineType } from "sanity";

/**
 * Depoimento de parceiro.
 *
 * Aparece na home e na página de modelo de negócio. O campo `unidade` importa
 * tanto quanto o texto: depoimento sem cidade e sem loja parece inventado.
 */
export const depoimento = defineType({
  name: "depoimento",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome de quem falou",
      type: "string",
      validation: (regra) => regra.required(),
    }),
    defineField({
      name: "unidade",
      title: "Loja e cidade",
      type: "string",
      description: 'Ex.: "Unishop Uberlândia — MG".',
    }),
    defineField({
      name: "texto",
      title: "Depoimento",
      type: "text",
      rows: 5,
      validation: (regra) => regra.required().max(600),
    }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ordem",
      title: "Ordem",
      type: "number",
      description: "Menor aparece primeiro.",
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: "Ordem", name: "ordem", by: [{ field: "ordem", direction: "asc" }] },
  ],
  preview: { select: { title: "nome", subtitle: "unidade", media: "foto" } },
});
