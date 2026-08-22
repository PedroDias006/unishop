import { defineField, defineType } from "sanity";

/** Quem assina o post. A rede usa "Equipe Unishop" na maior parte dos artigos. */
export const autor = defineType({
  name: "autor",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (regra) => regra.required(),
    }),
    defineField({ name: "cargo", title: "Cargo", type: "string" }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "nome", subtitle: "cargo", media: "foto" } },
});
