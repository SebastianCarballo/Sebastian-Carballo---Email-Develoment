import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";
import JsonLd from "@/components/seo/JsonLd";
import Faq, { faqJsonLd } from "@/components/seo/Faq";
import AnswerBox from "@/components/seo/AnswerBox";
import { canonical, siteUrl, socials } from "@/lib/seo";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const title = lang === "es" ? "Quién soy — Email Developer" : "About — Email Developer";
  const description =
    lang === "es"
      ? "Email developer: MJML, HTML tabular, VML para Outlook, dark mode y accesibilidad. Por qué el email bien maquetado vende más."
      : "Email developer: MJML, table HTML, Outlook VML, dark mode and accessibility. Why well-coded email sells more.";
  return {
    title,
    description,
    alternates: { canonical: canonical(`/${lang}/about`) },
    openGraph: { title, description, url: canonical(`/${lang}/about`), type: "profile" },
  };
}

const FAQS = {
  es: [
    { q: "¿Qué es un email developer?", a: "Es el profesional que maqueta emails HTML tabulares y MJML compatibles con Outlook, Gmail y Apple Mail, con dark mode, accesibilidad y deliverability." },
    { q: "¿Por qué mis emails se rompen en Outlook?", a: "Outlook usa Word como motor de render: ignora flexbox, border-radius y background-image. La solución es usar tablas y VML (v:roundrect, v:rect) para botones y fondos." },
    { q: "¿Qué peso máximo debe tener un email?", a: "Gmail recorta mensajes de más de ~102KB. Mantén el CSS inline mínimo, evita código duplicado e incluye preheader oculto y versión de texto." },
    { q: "¿Cómo soporto dark mode en email?", a: "Declara <meta name=\"color-scheme\" content=\"light dark\">, evita PNG transparentes con texto negro, usa fondos sólidos y testea Apple Mail (inversión total) y Gmail (inversión parcial)." },
  ],
  en: [
    { q: "What is an email developer?", a: "A professional who codes table-based HTML and MJML emails compatible with Outlook, Gmail and Apple Mail, with dark mode, accessibility and deliverability." },
    { q: "Why do my emails break in Outlook?", a: "Outlook uses Word as its rendering engine: it ignores flexbox, border-radius and background-image. Use tables plus VML (v:roundrect, v:rect) for buttons and backgrounds." },
    { q: "What is the max email size?", a: "Gmail clips messages larger than ~102KB. Keep inline CSS minimal, avoid duplicated code, and include a hidden preheader plus a text version." },
    { q: "How do I support dark mode in email?", a: "Declare <meta name=\"color-scheme\" content=\"light dark\">, avoid transparent PNGs with black text, use solid backgrounds, and test Apple Mail (full invert) vs Gmail (partial invert)." },
  ],
} as const;

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const faqs = [...FAQS[lang]];

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Email Developer",
    url: canonical(`/${lang}/about`),
    jobTitle: "Email Developer",
    knowsAbout: ["MJML", "HTML email", "Outlook VML", "Dark mode email", "Email accessibility"],
    sameAs: [socials.github, socials.linkedin, socials.x],
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-14">
      <JsonLd data={[personLd, faqJsonLd(faqs)]} />
      <p className="font-mono text-sm text-cta">whoami --email-dev</p>
      <h1 className="mt-2 text-4xl font-extrabold">{dict.about.title}</h1>
      <div className="mt-4">
        <AnswerBox title={lang === "es" ? "En resumen" : "TL;DR"}>
          <p>{dict.about.body2}</p>
        </AnswerBox>
      </div>
      <p className="mt-4 text-lg text-slate-700">{dict.about.body1}</p>
      <p className="mt-3 text-lg text-slate-700">{dict.about.body2}</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {dict.about.list.map((item: string) => (
          <li key={item} className="rounded-lg border bg-white p-3 font-mono text-sm">
            ✓ {item}
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-xl bg-ink p-6 text-white">
        <h2 className="font-mono text-sm text-inbox">{lang === "es" ? "Mi proceso" : "My process"}</h2>
        <ol className="mt-2 space-y-2 text-sm text-slate-200">
          <li>1. {lang === "es" ? "Diseño → sistema modular (600px + fluido + híbrido)" : "Design → modular system (600px + fluid + hybrid)"}</li>
          <li>2. {lang === "es" ? "Maquetación MJML + fallback tabular + VML Outlook" : "MJML coding + table fallback + Outlook VML"}</li>
          <li>3. {lang === "es" ? "Test Litmus / Email on Acid: 12 clientes + dark mode" : "Litmus / Email on Acid testing: 12 clients + dark mode"}</li>
          <li>4. QA: {lang === "es" ? "accesibilidad, peso <102KB, preheader, UTMs" : "accessibility, <102KB weight, preheader, UTMs"}</li>
        </ol>
      </div>
      <Faq items={faqs} heading={lang === "es" ? "Preguntas frecuentes" : "FAQ"} />
      <p className="mt-6 font-mono text-xs text-slate-400">
        {lang === "es" ? "Actualizado: 2026-10-09 · Fuente primaria: este sitio" : "Updated: 2026-10-09 · Primary source: this site"} · <a className="underline" href={`${siteUrl}/${lang}/about`}>{lang === "es" ? "URL canónica" : "Canonical URL"}</a>
      </p>
    </article>
  );
}
