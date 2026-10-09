import { hasSanityEnv } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, POST_QUERY, PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import {
  hasStrapiEnv,
  strapiGetPost,
  strapiGetPosts,
  strapiGetProject,
  strapiGetProjects,
} from "@/lib/strapi";
import {
  getPost as getMockPost,
  getPosts as getMockPosts,
  getProject as getMockProject,
  getProjects as getMockProjects,
  type Locale as MockLocale,
} from "@/lib/data";

type Locale = "es" | "en";

// Prioridad: Strapi (local) → Sanity → mock.
async function first<T>(
  strapiFn: () => Promise<T[] | T | undefined>,
  sanityFn: () => Promise<T[] | T | undefined>,
  mock: T[] | T | undefined
): Promise<T[] | T | undefined> {
  if (hasStrapiEnv) {
    try {
      const data = await strapiFn();
      if (Array.isArray(data) ? data.length > 0 : data) return data;
    } catch {
      // cae a Sanity/mock
    }
  }
  if (hasSanityEnv) {
    try {
      const data = await sanityFn();
      if (Array.isArray(data) ? data.length > 0 : data) return data;
    } catch {
      // cae a mock
    }
  }
  return mock;
}

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
  const list = (await first(
    () => strapiGetProjects(locale),
    async () => {
      const { data } = await sanityFetch({ query: PROJECTS_QUERY });
      const rows = data as unknown as Record<string, unknown>[];
      return Array.isArray(rows) ? rows.map((r) => toProject(r, locale)) : [];
    },
    getMockProjects(locale as MockLocale)
  )) as ReturnType<typeof getMockProjects> | undefined;
  return list ?? getMockProjects(locale as MockLocale);
}

export async function cmsGetProject(slug: string, locale: Locale) {
  return first(
    () => strapiGetProject(slug, locale),
    async () => {
      const { data } = await sanityFetch({ query: PROJECT_QUERY, params: { slug } });
      return data ? toProject(data as Record<string, unknown>, locale) : undefined;
    },
    getMockProject(slug)
  );
}

export async function cmsGetPosts(locale: Locale) {
  const list = (await first(
    () => strapiGetPosts(locale),
    async () => {
      const { data } = await sanityFetch({ query: POSTS_QUERY });
      const rows = data as unknown as Record<string, unknown>[];
      return Array.isArray(rows) ? rows.map((r) => toPost(r, locale)) : [];
    },
    getMockPosts(locale as MockLocale)
  )) as ReturnType<typeof getMockPosts> | undefined;
  return list ?? getMockPosts(locale as MockLocale);
}

export async function cmsGetPost(slug: string) {
  return first(
    () => strapiGetPost(slug),
    async () => {
      const { data } = await sanityFetch({ query: POST_QUERY, params: { slug } });
      return (data as Record<string, unknown>) ?? undefined;
    },
    getMockPost(slug)
  );
}
