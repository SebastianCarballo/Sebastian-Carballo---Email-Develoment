import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title_es", title: "Título (ES)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "minutes", type: "number", initialValue: 5 }),
    defineField({ name: "excerpt_es", type: "text", rows: 2 }),
    defineField({ name: "excerpt_en", type: "text", rows: 2 }),
    defineField({ name: "cover", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body_es",
      title: "Cuerpo (ES)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "body_en",
      title: "Body (EN)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title_en", subtitle: "category" },
  },
});
