import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../../dictionaries";
import { cmsGetPost } from "@/lib/cms";
import { posts } from "@/lib/data";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBox from "@/components/seo/AnswerBox";
import Faq, { faqJsonLd } from "@/components/seo/Faq";
import { canonical, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = posts.map((p) => p.slug);
  return [
    ...slugs.map((slug) => ({ lang: "es", slug })),
    ...slugs.map((slug) => ({ lang: "en", slug })),
  ];
}

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const post = (await cmsGetPost(slug)) as {
    title_es?: string;
    title_en?: string;
    excerpt_es?: string;
    excerpt_en?: string;
  } | undefined;
  const title = (lang === "es" ? post?.title_es : post?.title_en) ?? slug;
  const description = (lang === "es" ? post?.excerpt_es : post?.excerpt_en) ?? "";
  return {
    title: `${title} — Blog email`,
    description,
    alternates: { canonical: canonical(`/${lang}/blog/${slug}`) },
    openGraph: { title, description, url: canonical(`/${lang}/blog/${slug}`), type: "article" },
  };
}

function portableTextToParagraphs(body: unknown): string[] {
  if (!Array.isArray(body)) return [];
  return body
    .map((block) => {
      const b = block as { _type?: string; children?: { text?: string }[] };
      if (b._type !== "block" || !Array.isArray(b.children)) return "";
      return b.children.map((c) => c.text ?? "").join("");
    })
    .filter(Boolean);
}

const POST_FAQS: Record<string, { es: { q: string; a: string }[]; en: { q: string; a: string }[] }> = {
  "dark-mode-email": {
    es: [
      { q: "¿Qué meta tag necesito para dark mode en email?", a: "Declara <meta name=\"color-scheme\" content=\"light dark\"> y :root { color-scheme: light dark; } para que los clientes sepan que soportas ambos esquemas." },
      { q: "¿Por qué mi logo se invierte en dark mode?", a: "Los PNG transparentes con texto oscuro se invierten. Pon el logo sobre un pill o fondo sólido blanco." },
      { q: "¿Apple Mail y Gmail tratan igual el dark mode?", a: "No. Apple Mail hace inversión total y Gmail parcial. Testea en ambos; son comportamientos distintos." },
    ],
    en: [
      { q: "Which meta tag enables dark mode in email?", a: "Declare <meta name=\"color-scheme\" content=\"light dark\"> plus :root { color-scheme: light dark; } so clients know you support both schemes." },
      { q: "Why does my logo invert in dark mode?", a: "Transparent PNGs with dark text get inverted. Place the logo on a white pill or solid background." },
      { q: "Do Apple Mail and Gmail handle dark mode the same?", a: "No. Apple Mail does full inversion, Gmail partial. Test on both; behaviors differ." },
    ],
  },
  "outlook-vml": {
    es: [
      { q: "¿Por qué Outlook necesita VML?", a: "Outlook usa Word como motor: sin VML no hay border-radius ni background-image. VML dibuja botones y fondos." },
      { q: "¿Cuál es el patrón de botón bulletproof?", a: "<!--[if mso]><v:roundrect>…<![endif]--> para Outlook más un <a> real con estilos inline para el resto." },
      { q: "¿MJML genera el VML por mí?", a: "Sí, MJML genera VML automáticamente, pero conviene entender el output para debuguear casos borde." },
    ],
    en: [
      { q: "Why does Outlook need VML?", a: "Outlook uses Word as its engine: without VML there is no border-radius or background-image. VML draws buttons and backgrounds." },
      { q: "What is the bulletproof button pattern?", a: "<!--[if mso]><v:roundrect>…<![endif]--> for Outlook plus a real <a> with inline styles for everyone else." },
      { q: "Does MJML generate VML for me?", a: "Yes, MJML emits VML automatically, but learn the output to debug edge cases." },
    ],
  },
  "accesibilidad-email": {
    es: [
      { q: "¿Qué rol llevan las tablas de maquetación?", a: "role=\"presentation\" para que los lectores de pantalla ignoren las tablas de layout y lean solo el contenido." },
      { q: "¿Qué contraste mínimo necesita un email?", a: "4.5:1 para texto normal (AA). Verifica CTA y texto secundario." },
      { q: "¿Qué tamaño mínimo de fuente y CTA?", a: "14px de fuente, interlineado 1.5 y CTA de al menos 44px de alto para táctil." },
    ],
    en: [
      { q: "Which role do layout tables need?", a: "role=\"presentation\" so screen readers skip layout tables and read only the content." },
      { q: "What minimum contrast does email need?", a: "4.5:1 for body text (AA). Check CTAs and secondary text." },
      { q: "What minimum font and CTA size?", a: "14px font, 1.5 line-height and CTAs at least 44px tall for touch." },
    ],
  },
};

export default async function PostPage(props: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const post = (await cmsGetPost(slug)) as Record<string, unknown> | undefined;
  if (!post || !post.slug) notFound();

  const title = (post[`title_${lang}`] as string) ?? (post.title as Record<string, string> | undefined)?.[lang] ?? "";
  const excerpt = (post[`excerpt_${lang}`] as string) ?? (post.excerpt as Record<string, string> | undefined)?.[lang] ?? "";
  const mockBody = (post.body as Record<string, string[]> | undefined)?.[lang];
  const sanityBody = portableTextToParagraphs(post[`body_${lang}`]);
  const paragraphs = mockBody ?? sanityBody;
  const category = (post.category as string) ?? "";
  const date = (post.date as string) ?? "";
  const minutes = Number(post.minutes ?? 5);
  const tags = (post.tags as string[]) ?? [];
  const faqs = POST_FAQS[String(post.slug)]?.[lang] ?? [];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url: canonical(`/${lang}/blog/${slug}`),
    inLanguage: lang,
    datePublished: date || "2026-01-01",
    dateModified: "2026-10-09",
    author: { "@type": "Person", name: "Email Developer", url: canonical(`/${lang}/about`) },
    publisher: { "@type": "Organization", name: "inbox.dev", url: siteUrl },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: canonical(`/${lang}`) },
      { "@type": "ListItem", position: 2, name: "Blog", item: canonical(`/${lang}/blog`) },
      { "@type": "ListItem", position: 3, name: title, item: canonical(`/${lang}/blog/${slug}`) },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <JsonLd data={[articleLd, breadcrumbLd, ...(faqs.length ? [faqJsonLd(faqs)] : [])]} />
      <nav aria-label="Breadcrumb">
        <Link href={`/${lang}/blog`} className="text-sm underline">← {dict.blog.title}</Link>
      </nav>
      <p className="mt-4 font-mono text-xs text-cta">
        <time dateTime={date}>{category} · {date} · {minutes} {dict.blog.min}</time>
      </p>
      <h1 className="mt-1 text-4xl font-extrabold leading-tight">{title}</h1>
      <div className="mt-4">
        <AnswerBox title={lang === "es" ? "Respuesta directa" : "Direct answer"}>
          <p>{excerpt} {paragraphs[0] ?? ""}</p>
        </AnswerBox>
      </div>
      <p className="mt-4 text-lg text-slate-600">{excerpt}</p>
      <div className="mt-6 space-y-4">
        {paragraphs.map((para: string, i: number) => (
          <p key={i} className={`leading-relaxed ${i === 0 ? "text-lg text-slate-800" : "text-slate-700"}`}>
            {para}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((t: string) => (
          <span key={t} className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600">#{t}</span>
        ))}
      </div>
      {faqs.length > 0 && <Faq items={faqs} heading={lang === "es" ? "Preguntas frecuentes del artículo" : "Article FAQ"} />}
      <p className="mt-6 border-t pt-4 font-mono text-xs text-slate-400">
        {lang === "es" ? "Fuente primaria" : "Primary source"}: <a className="underline" href={canonical(`/${lang}/blog/${slug}`)}>{lang === "es" ? "URL canónica" : "Canonical URL"}</a> · {lang === "es" ? "Cita permitida ≤300 palabras con enlace" : "Quotes ≤300 words allowed with link"}
      </p>
    </article>
  );
}
