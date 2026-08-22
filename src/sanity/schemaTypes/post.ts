import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * O post do blog.
 *
 * Os campos estão em português porque quem preenche é o time de marketing, e o
 * painel mostra exatamente estes nomes. `resumo` e `capa` não são enfeite: são
 * o que aparece no cartão da listagem, no compartilhamento em rede social e na
 * busca do Google — por isso os dois são obrigatórios.
 */
export const post = defineType({
  name: "post",
  title: "Post do blog",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (regra) => regra.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Endereço (slug)",
      type: "slug",
      description: "É o que aparece na URL. Mudar depois de publicado quebra links.",
      options: { source: "titulo", maxLength: 96 },
      validation: (regra) => regra.required(),
    }),
    defineField({
      name: "resumo",
      title: "Resumo",
      type: "text",
      rows: 3,
      description: "Duas ou três linhas. Aparece no cartão do blog e no Google.",
      validation: (regra) => regra.required().min(60).max(260),
    }),
    defineField({
      name: "capa",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descrição da imagem",
          type: "string",
          description: "Para quem usa leitor de tela e para quando a imagem não carrega.",
          validation: (regra) => regra.required(),
        }),
      ],
      validation: (regra) => regra.required(),
    }),
    defineField({
      name: "publicadoEm",
      title: "Data de publicação",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (regra) => regra.required(),
    }),
    defineField({
      name: "autor",
      title: "Autor",
      type: "reference",
      to: [{ type: "autor" }],
    }),
    defineField({
      name: "categorias",
      title: "Categorias",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "categoria" }] })],
    }),
    defineField({
      name: "destaque",
      title: "Destacar na home",
      type: "boolean",
      description: "Aparece antes dos demais na seção de blog da página inicial.",
      initialValue: false,
    }),
    defineField({
      name: "corpo",
      title: "Conteúdo",
      type: "blockContent",
      validation: (regra) => regra.required(),
    }),
  ],
  orderings: [
    {
      title: "Mais recentes primeiro",
      name: "publicadoEmDesc",
      by: [{ field: "publicadoEm", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titulo", subtitle: "publicadoEm", media: "capa" },
  },
});
