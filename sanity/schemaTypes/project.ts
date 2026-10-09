import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
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
    defineField({ name: "client", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "excerpt_es", type: "text", rows: 2 }),
    defineField({ name: "excerpt_en", type: "text", rows: 2 }),
    defineField({ name: "challenge_es", type: "text", rows: 3 }),
    defineField({ name: "challenge_en", type: "text", rows: 3 }),
    defineField({ name: "solution_es", type: "text", rows: 3 }),
    defineField({ name: "solution_en", type: "text", rows: 3 }),
    defineField({ name: "results", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "cover", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "title_en", subtitle: "client" },
  },
});
