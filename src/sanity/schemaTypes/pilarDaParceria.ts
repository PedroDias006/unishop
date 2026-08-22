import { defineField, defineType } from "sanity";

/** Um dos pilares do modelo de parceria, no carrossel da home. */
export const pilarDaParceria = defineType({
  name: "pilarDaParceria",
  title: "Pilar da parceria",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (regra) => regra.required().max(80),
    }),
    defineField({
      name: "texto",
      title: "Texto",
      type: "text",
      rows: 5,
      validation: (regra) => regra.required().max(700),
    }),
    defineField({
      name: "identificador",
      title: "Identificador",
      type: "slug",
      description: "Usado como âncora na página. Não repita entre pilares.",
      options: { source: "titulo", maxLength: 40 },
      validation: (regra) => regra.required(),
    }),
    defineField({ name: "ordem", title: "Ordem", type: "number", initialValue: 10 }),
  ],
  orderings: [
    { title: "Ordem", name: "ordem", by: [{ field: "ordem", direction: "asc" }] },
  ],
  preview: { select: { title: "titulo", subtitle: "texto" } },
});
