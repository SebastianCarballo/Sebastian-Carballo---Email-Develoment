// Conector Strapi (REST) con fallback. Activo solo si STRAPI_URL está definido.
// Prioridad del CMS: Strapi → Sanity → mock local.

export const strapiUrl = (process.env.STRAPI_URL || "").replace(/\/$/, "");
export const hasStrapiEnv = Boolean(strapiUrl);

type Locale = "es" | "en";

interface StrapiItem {
  slug?: string;
  [key: string]: unknown;
}

async function strapiGet(path: string) {
  const res = await fetch(`${strapiUrl}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status} en ${path}`);
  const json = (await res.json()) as { data?: StrapiItem | StrapiItem[] };
  if (Array.isArray(json.data)) return json.data;
  return json.data ? [json.data] : [];
}

// Markdown simple → bloques. Los párrafos que empiezan con "## " se conservan
// como headings para la estructura h1→h2 del artículo.
function mdToParagraphs(md: unknown): string[] {
  if (typeof md !== "string") return [];
  return md
    .split(/\n\s*\n/)
    .map((p) => {
      const trimmed = p.trim();
      if (trimmed.startsWith("## ")) return "## " + trimmed.slice(3).replace(/[*_`>\-[\]()]/g, "").trim();
      return trimmed.replace(/[*_`#>\-[\]()]/g, "").trim();
    })
    .filter((p) => p.length > 0 && p !== "##");
}

export async function strapiGetProjects(locale: Locale) {
  const rows = await strapiGet("/projects?pagination[pageSize]=100&sort=year:desc");
  return rows.map((r) => ({
    slug: String(r.slug ?? ""),
    client: String(r.client ?? ""),
    year: String(r.year ?? ""),
    tags: (r.tags as string[]) ?? [],
    results: (r.results as string[]) ?? [],
    featured: Boolean(r.featured),
    tTitle: String(r[`title_${locale}`] ?? r.title_en ?? ""),
    tExcerpt: String(r[`excerpt_${locale}`] ?? r.excerpt_en ?? ""),
    title: { es: String(r.title_es ?? ""), en: String(r.title_en ?? "") },
    excerpt: { es: String(r.excerpt_es ?? ""), en: String(r.excerpt_en ?? "") },
    challenge: { es: String(r.challenge_es ?? ""), en: String(r.challenge_en ?? "") },
    solution: { es: String(r.solution_es ?? ""), en: String(r.solution_en ?? "") },
  }));
}

export async function strapiGetProject(slug: string, locale: Locale) {
  const rows = await strapiGet(`/projects?filters[slug][$eq]=${encodeURIComponent(slug)}`);
  const list = await strapiGetProjects(locale);
  return list.find((p) => p.slug === (rows[0]?.slug as string) || p.slug === slug);
}

export async function strapiGetPosts(locale: Locale) {
  const rows = await strapiGet("/posts?pagination[pageSize]=100&sort=date:desc");
  return rows.map((r) => ({
    slug: String(r.slug ?? ""),
    category: String(r.category ?? ""),
    tags: (r.tags as string[]) ?? [],
    minutes: Number(r.minutes ?? 5),
    date: String(r.date ?? ""),
    tTitle: String(r[`title_${locale}`] ?? r.title_en ?? ""),
    tExcerpt: String(r[`excerpt_${locale}`] ?? r.excerpt_en ?? ""),
    title: { es: String(r.title_es ?? ""), en: String(r.title_en ?? "") },
    excerpt: { es: String(r.excerpt_es ?? ""), en: String(r.excerpt_en ?? "") },
  }));
}

export async function strapiGetPost(slug: string) {
  const rows = await strapiGet(`/posts?filters[slug][$eq]=${encodeURIComponent(slug)}`);
  const r = rows[0];
  if (!r) return undefined;
  const body = {
    es: mdToParagraphs(r.body_es),
    en: mdToParagraphs(r.body_en),
  };
  return {
    slug: String(r.slug ?? ""),
    category: String(r.category ?? ""),
    tags: (r.tags as string[]) ?? [],
    minutes: Number(r.minutes ?? 5),
    date: String(r.date ?? ""),
    title: { es: String(r.title_es ?? ""), en: String(r.title_en ?? "") },
    excerpt: { es: String(r.excerpt_es ?? ""), en: String(r.excerpt_en ?? "") },
    body,
  };
}
