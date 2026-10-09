import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(year desc) {
  "slug": slug.current,
  client, year, tags, results, featured,
  title_es, title_en, excerpt_es, excerpt_en,
  challenge_es, challenge_en, solution_es, solution_en
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  "slug": slug.current,
  client, year, tags, results, featured,
  title_es, title_en, excerpt_es, excerpt_en,
  challenge_es, challenge_en, solution_es, solution_en
}`);

export const POSTS_QUERY = defineQuery(`*[_type == "post"] | order(date desc) {
  "slug": slug.current,
  category, tags, minutes, date,
  title_es, title_en, excerpt_es, excerpt_en
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  "slug": slug.current,
  category, tags, minutes, date, cover,
  title_es, title_en, excerpt_es, excerpt_en,
  body_es, body_en
}`);
