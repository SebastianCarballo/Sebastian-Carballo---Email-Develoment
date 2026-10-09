import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClientBadges from "@/components/email-ui/ClientBadges";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBox from "@/components/seo/AnswerBox";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../../dictionaries";
import { cmsGetProject } from "@/lib/cms";
import { projects } from "@/lib/data";
import { canonical } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = projects.map((p) => p.slug);
  return [
    ...slugs.map((slug) => ({ lang: "es", slug })),
    ...slugs.map((slug) => ({ lang: "en", slug })),
  ];
}

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const project = (await cmsGetProject(slug, lang as "es" | "en")) as {
    title: Record<string, string>;
    excerpt: Record<string, string>;
  } | undefined;
  const title = project ? `${project.title[lang]} — Caso email` : "Caso email";
  const description = project?.excerpt[lang] ?? "Caso real de email development.";
  return {
    title,
    description,
    alternates: { canonical: canonical(`/${lang}/work/${slug}`) },
    openGraph: { title, description, url: canonical(`/${lang}/work/${slug}`), type: "article" },
  };
}

export default async function ProjectPage(props: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const project = (await cmsGetProject(slug, lang)) as {
    slug: string;
    client: string;
    year: string;
    results: string[];
    title: Record<string, string>;
    excerpt: Record<string, string>;
    challenge: Record<string, string>;
    solution: Record<string, string>;
  } | undefined;
  if (!project) notFound();
  await getDictionary(lang);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: canonical(`/${lang}`) },
      { "@type": "ListItem", position: 2, name: "Work", item: canonical(`/${lang}/work`) },
      { "@type": "ListItem", position: 3, name: project.title[lang], item: canonical(`/${lang}/work/${slug}`) },
    ],
  };
  const workLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[lang],
    description: project.excerpt[lang],
    url: canonical(`/${lang}/work/${slug}`),
    inLanguage: lang,
    author: { "@type": "Person", name: "Email Developer" },
    datePublished: `${project.year}-01-01`,
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-14">
      <JsonLd data={[breadcrumbLd, workLd]} />
      <nav aria-label="Breadcrumb">
        <Link href={`/${lang}/work`} className="text-sm underline">← work</Link>
      </nav>
      <p className="mt-4 font-mono text-xs text-muted">{project.client} · {project.year} · {lang === "es" ? "Actualizado 2026-10-09" : "Updated 2026-10-09"}</p>
      <h1 className="mt-1 text-4xl font-extrabold">{project.title[lang]}</h1>
      <div className="mt-4">
        <AnswerBox title="TL;DR">
          <p><strong>{lang === "es" ? "Reto:" : "Challenge:"}</strong> {project.challenge[lang]} <strong>{lang === "es" ? "Solución:" : "Fix:"}</strong> {project.solution[lang]}</p>
        </AnswerBox>
      </div>
      <p className="mt-4 text-lg text-slate-600">{project.excerpt[lang]}</p>
      <div className="mt-4"><ClientBadges /></div>
      <h2 className="mt-8 text-2xl font-bold">{lang === "es" ? "Reto y solución" : "Challenge & fix"}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <h3 className="font-mono text-sm text-cta">{lang === "es" ? "Reto" : "Challenge"}</h3>
          <p className="mt-1 text-slate-700">{project.challenge[lang]}</p>
        </div>
        <div className="rounded-xl bg-ink p-5 text-white">
          <h3 className="font-mono text-sm text-inbox">{lang === "es" ? "Solución" : "Solution"}</h3>
          <p className="mt-1 text-slate-200">{project.solution[lang]}</p>
        </div>
      </div>
      <div className="mt-6 rounded-xl border bg-white p-5">
        <h2 className="font-bold">{lang === "es" ? "Resultados" : "Results"}</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.results.map((r: string) => (
            <li key={r} className="rounded-full bg-sent/15 px-3 py-1 text-sm font-semibold text-green-700">{r}</li>
          ))}
        </ul>
      </div>
      {/* Email preview mock */}
      <div className="mt-6 overflow-hidden rounded-xl border">
        <div className="bg-slate-100 px-4 py-2 font-mono text-xs text-slate-500">preview — 600px desktop / 320px mobile</div>
        <div className="bg-white p-6">
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td style={{ background: "#0A0F1E", padding: 24, borderRadius: 12, color: "#fff" }}>
                    <p style={{ margin: 0, fontSize: 12, color: "#00D4FF" }}>{project.client} — newsletter</p>
                    <h3 style={{ margin: "8px 0" }}>{project.title[lang]}</h3>
                    <p style={{ margin: 0, color: "#cbd5e1" }}>{project.excerpt[lang]}</p>
                    <p style={{ marginTop: 16 }}>
                      <span style={{ background: "#FF6B35", padding: "10px 18px", borderRadius: 8, fontWeight: 700 }}>CTA →</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  );
}
