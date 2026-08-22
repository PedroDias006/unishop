import { defineField, defineType } from "sanity";

/** Categoria do blog. Vira filtro na listagem e entra na URL. */
export const categoria = defineType({
  name: "categoria",
  title: "Categoria",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (regra) => regra.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço (slug)",
      type: "slug",
      options: { source: "nome", maxLength: 60 },
      validation: (regra) => regra.required(),
    }),
    defineField({ name: "descricao", title: "Descrição", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "nome", subtitle: "descricao" } },
});
