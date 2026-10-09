import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";
import { canonical, keywordsByPage } from "@/lib/seo";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const title = lang === "es" ? "Contacto — Email Developer" : "Contact — Email Developer";
  const description =
    lang === "es"
      ? "Cuéntame tu próximo envío: newsletter, transaccional o promo. Respuesta en 24h."
      : "Tell me about your next send: newsletter, transactional or promo. Reply within 24h.";
  return {
    title,
    description,
    keywords: keywordsByPage.contact[lang as "es" | "en"],
    alternates: { canonical: canonical(`/${lang}/contacto`) },
    openGraph: { title, description, url: canonical(`/${lang}/contacto`) },
  };
}

export default async function ContactPage(props: PageProps<"/[lang]/contacto">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: lang === "es" ? "Contacto — Email Developer" : "Contact — Email Developer",
    url: canonical(`/${lang}/contacto`),
    inLanguage: lang,
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-14">
      <JsonLd data={contactLd} />
      <h1 className="text-4xl font-extrabold">{dict.contact.title}</h1>
      <p className="mt-1 text-slate-600">{dict.contact.subtitle}</p>
      <ContactForm dict={dict.contact} />
    </section>
  );
}
