import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * O corpo de um post.
 *
 * A lista de estilos é curta de propósito: título de seção, subtítulo, citação,
 * listas e parágrafo. Quanto menos opções, mais consistente fica o blog — e o
 * H1 não entra porque ele já é o título do post, e dois H1 na mesma página
 * confundem o buscador.
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Conteúdo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Parágrafo", value: "normal" },
        { title: "Título de seção", value: "h2" },
        { title: "Subtítulo", value: "h3" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [
        { title: "Lista", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrito", value: "strong" },
          { title: "Itálico", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Endereço",
                type: "url",
                validation: (regra) =>
                  regra.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descrição da imagem",
          type: "string",
          validation: (regra) => regra.required(),
        }),
        defineField({ name: "legenda", title: "Legenda", type: "string" }),
      ],
    }),
  ],
});
