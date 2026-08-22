import { defineField, defineType } from "sanity";

/**
 * Uma pergunta do FAQ.
 *
 * É a seção que mais recebe dúvida antes do formulário — se é franquia, quanto
 * custa, o que vem incluso, em quanto tempo retorna. A resposta entra no HTML,
 * então também é o que o Google lê.
 */
export const perguntaFrequente = defineType({
  name: "perguntaFrequente",
  title: "Pergunta frequente",
  type: "document",
  fields: [
    defineField({
      name: "pergunta",
      title: "Pergunta",
      type: "string",
      validation: (regra) => regra.required().max(160),
    }),
    defineField({
      name: "resposta",
      title: "Resposta",
      type: "text",
      rows: 5,
      validation: (regra) => regra.required(),
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
  preview: { select: { title: "pergunta" } },
});
