import { hasSanityEnv } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, POST_QUERY, PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import {
  getPost as getMockPost,
  getPosts as getMockPosts,
  getProject as getMockProject,
  getProjects as getMockProjects,
  type Locale as MockLocale,
} from "@/lib/data";

type Locale = "es" | "en";

function toProject(row: Record<string, unknown>, locale: Locale) {
  const slug = String(row.slug ?? "");
  return {
    slug,
    client: String(row.client ?? ""),
    year: String(row.year ?? ""),
    tags: (row.tags as string[]) ?? [],
    results: (row.results as string[]) ?? [],
    featured: Boolean(row.featured),
    tTitle: String(row[`title_${locale}`] ?? row.title_en ?? ""),
    tExcerpt: String(row[`excerpt_${locale}`] ?? row.excerpt_en ?? ""),
    title: { es: String(row.title_es ?? ""), en: String(row.title_en ?? "") } as Record<Locale, string>,
    excerpt: { es: String(row.excerpt_es ?? ""), en: String(row.excerpt_en ?? "") } as Record<Locale, string>,
    challenge: { es: String(row.challenge_es ?? ""), en: String(row.challenge_en ?? "") } as Record<Locale, string>,
    solution: { es: String(row.solution_es ?? ""), en: String(row.solution_en ?? "") } as Record<Locale, string>,
  };
}

function toPost(row: Record<string, unknown>, locale: Locale) {
  return {
    slug: String(row.slug ?? ""),
    category: String(row.category ?? ""),
    tags: (row.tags as string[]) ?? [],
    minutes: Number(row.minutes ?? 5),
    date: String(row.date ?? ""),
    tTitle: String(row[`title_${locale}`] ?? row.title_en ?? ""),
    tExcerpt: String(row[`excerpt_${locale}`] ?? row.excerpt_en ?? ""),
    title: { es: String(row.title_es ?? ""), en: String(row.title_en ?? "") } as Record<Locale, string>,
    excerpt: { es: String(row.excerpt_es ?? ""), en: String(row.excerpt_en ?? "") } as Record<Locale, string>,
  };
}

export async function cmsGetProjects(locale: Locale) {
  if (!hasSanityEnv) return getMockProjects(locale as MockLocale);
  try {
    const { data } = await sanityFetch({ query: PROJECTS_QUERY });
    const rows = data as unknown as Record<string, unknown>[];
    if (!Array.isArray(rows) || !rows.length) return getMockProjects(locale as MockLocale);
    return rows.map((r) => toProject(r, locale));
  } catch {
    return getMockProjects(locale as MockLocale);
  }
}

export async function cmsGetProject(slug: string, locale: Locale) {
  if (!hasSanityEnv) return getMockProject(slug);
  try {
    const { data } = await sanityFetch({ query: PROJECT_QUERY, params: { slug } });
    if (!data) return getMockProject(slug);
    return toProject(data as Record<string, unknown>, locale);
  } catch {
    return getMockProject(slug);
  }
}

export async function cmsGetPosts(locale: Locale) {
  if (!hasSanityEnv) return getMockPosts(locale as MockLocale);
  try {
    const { data } = await sanityFetch({ query: POSTS_QUERY });
    const rows = data as unknown as Record<string, unknown>[];
    if (!Array.isArray(rows) || !rows.length) return getMockPosts(locale as MockLocale);
    return rows.map((r) => toPost(r, locale));
  } catch {
    return getMockPosts(locale as MockLocale);
  }
}

export async function cmsGetPost(slug: string) {
  if (!hasSanityEnv) return getMockPost(slug);
  try {
    const { data } = await sanityFetch({ query: POST_QUERY, params: { slug } });
    if (!data) return getMockPost(slug);
    return data;
  } catch {
    return getMockPost(slug);
  }
}
