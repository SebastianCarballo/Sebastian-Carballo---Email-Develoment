import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";
import { cmsGetProjects } from "@/lib/cms";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBox from "@/components/seo/AnswerBox";
import CardCover, { coverForWork } from "@/components/cards/CardCover";
import { canonical } from "@/lib/seo";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const title = lang === "es" ? "Portfolio — Emails responsive y Outlook" : "Work — Responsive emails & Outlook";
  const description =
    lang === "es"
      ? "Casos reales: newsletter fintech, transaccionales accesibles y promo retail con VML. Retos de render y resultados."
      : "Real cases: fintech newsletter, accessible transactional emails and retail promo with VML. Render challenges and results.";
  return {
    title,
    description,
    alternates: { canonical: canonical(`/${lang}/work`) },
    openGraph: { title, description, url: canonical(`/${lang}/work`), type: "website" },
  };
}

export default async function WorkPage(props: PageProps<"/[lang]/work">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const projects = await cmsGetProjects(lang);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: lang === "es" ? "Portfolio de email development" : "Email development portfolio",
    url: canonical(`/${lang}/work`),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: canonical(`/${lang}/work/${p.slug}`),
        name: p.tTitle,
      })),
    },
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <JsonLd data={collectionLd} />
      <h1 className="text-4xl font-extrabold">{dict.work.title}</h1>
      <p className="mt-1 text-slate-600">{dict.work.subtitle}</p>
      <div className="mt-4 max-w-3xl">
        <AnswerBox title={lang === "es" ? "Qué verás aquí" : "What you will find"}>
          <p>
            {lang === "es"
              ? "3 casos con problema real de render (Outlook, Gmail, dark mode), solución con tablas/VML/MJML y métricas. Cada caso incluye preview tabular de 600px."
              : "3 cases with real rendering issues (Outlook, Gmail, dark mode), table/VML/MJML fixes and metrics. Each case includes a 600px table preview."}
          </p>
        </AnswerBox>
      </div>
      <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
        {projects.map((p) => {
          const cover = coverForWork(p.slug);
          return (
            <article key={p.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white">
              <CardCover variant={cover.variant} caption={cover.caption} lang={lang} />
              <div className="flex flex-1 flex-col p-5">
              <p className="font-mono text-xs text-muted">{p.client} · {p.year}</p>
              <h2 className="mt-1 text-xl font-bold">{p.tTitle}</h2>
              <p className="mt-1 flex-1 text-sm text-slate-600">{p.tExcerpt}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.results.map((r) => (
                  <span key={r} className="rounded-full bg-sent/15 px-2 py-0.5 text-xs font-semibold text-green-700">{r}</span>
                ))}
              </div>
              <Link href={`/${lang}/work/${p.slug}`} className="mt-4 rounded-full bg-ink px-4 py-2 text-center text-sm font-semibold text-white">
                {dict.work.viewCase} →
              </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
