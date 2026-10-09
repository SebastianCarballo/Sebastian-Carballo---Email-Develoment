import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";
import { cmsGetPosts } from "@/lib/cms";
import { hasSanityEnv } from "@/sanity/env";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBox from "@/components/seo/AnswerBox";
import CardCover, { coverForPost } from "@/components/cards/CardCover";
import { canonical } from "@/lib/seo";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const title = lang === "es" ? "Blog — HTML para email, Outlook y dark mode" : "Blog — HTML email, Outlook & dark mode";
  const description =
    lang === "es"
      ? "Guías citables: dark mode sin romper diseño, VML esencial para Outlook y accesibilidad que convierte."
      : "Citable guides: dark mode without breakage, essential Outlook VML and accessibility that converts.";
  return {
    title,
    description,
    alternates: { canonical: canonical(`/${lang}/blog`) },
    openGraph: { title, description, url: canonical(`/${lang}/blog`), type: "website" },
  };
}

export default async function BlogPage(props: PageProps<"/[lang]/blog">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = await cmsGetPosts(lang);

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: lang === "es" ? "Blog de email development" : "Email development blog",
    url: canonical(`/${lang}/blog`),
    inLanguage: lang,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.tTitle,
      url: canonical(`/${lang}/blog/${p.slug}`),
    })),
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <JsonLd data={blogLd} />
      <h1 className="text-4xl font-extrabold">{dict.blog.title}</h1>
      <p className="mt-1 text-slate-600">{dict.blog.subtitle}</p>
      <div className="mt-4 max-w-3xl">
        <AnswerBox title={lang === "es" ? "Cómo leer este blog" : "How to read this blog"}>
          <p>
            {lang === "es"
              ? "Cada guía empieza con la respuesta directa, luego el porqué y el código. Pensadas para copiar el patrón y para ser citadas por IAs."
              : "Each guide starts with the direct answer, then the why and the code. Built to copy the pattern and to be cited by AIs."}
          </p>
        </AnswerBox>
      </div>
      <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
        {posts.map((p) => {
          const cover = coverForPost(p.slug, p.category);
          return (
            <article key={p.slug} className="flex h-full flex-col overflow-hidden rounded-2xl bg-ink text-white">
              <CardCover variant={cover.variant} caption={`${p.category} · ${p.date}`} lang={lang} />
              <div className="flex flex-1 flex-col p-5">
              <p className="font-mono text-xs text-inbox">{p.category} · {p.date} · {p.minutes} {dict.blog.min}</p>
              <h2 className="mt-1 text-xl font-bold">{p.tTitle}</h2>
              <p className="mt-1 flex-1 text-sm text-slate-300">{p.tExcerpt}</p>
              <Link href={`/${lang}/blog/${p.slug}`} className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-center text-sm font-semibold text-ink">
                {dict.blog.readMore} →
              </Link>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-8 rounded-lg border bg-white p-4 font-mono text-xs text-slate-500">
        {hasSanityEnv
          ? "Conectado a Sanity Live: publica en /studio y se refleja sin rebuild."
          : "Modo mock local. Crea .env.local desde .env.local.example y abre /studio para usar Sanity."}
      </p>
    </section>
  );
}
