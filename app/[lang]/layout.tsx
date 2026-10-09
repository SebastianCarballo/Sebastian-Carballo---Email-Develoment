import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import JsonLd from "@/components/seo/JsonLd";
import { hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";
import { siteUrl, socials, canonical, keywordsByPage } from "@/lib/seo";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const other = lang === "es" ? "en" : "es";
  const title =
    lang === "es"
      ? "Email Developer — Portfolio & Blog | MJML, Outlook, Dark Mode"
      : "Email Developer — Portfolio & Blog | MJML, Outlook, Dark Mode";
  const description =
    lang === "es"
      ? "Portfolio y blog de email development: MJML, HTML responsive, VML para Outlook, dark mode y accesibilidad. Casos reales y guías."
      : "Email development portfolio & blog: MJML, responsive table HTML, Outlook VML, dark mode and accessibility. Real cases and guides.";
  return {
    title,
    description,
    keywords: keywordsByPage.home[lang as "es" | "en"],
    alternates: {
      canonical: canonical(`/${lang}`),
      languages: { [lang]: canonical(`/${lang}`), [other]: canonical(`/${other}`), "x-default": canonical("/es") },
    },
    openGraph: {
      title,
      description,
      url: canonical(`/${lang}`),
      locale: lang === "es" ? "es_ES" : "en_US",
      alternateLocale: [lang === "es" ? "en_US" : "es_ES"],
      type: "website",
    },
  };
}

export default async function LangLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { children } = props;

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "inbox.dev — Email Developer",
    url: siteUrl,
    inLanguage: [lang],
    author: { "@type": "Person", name: "Email Developer" },
  };
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Email Developer",
    jobTitle: lang === "es" ? "Email Developer" : "Email Developer",
    url: canonical(`/${lang}/about`),
    knowsAbout: ["MJML", "HTML email", "Outlook VML", "Dark mode email", "Email accessibility", "Deliverability"],
    sameAs: [socials.github, socials.linkedin, socials.x],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={[websiteLd, personLd]} />
      <ScrollProgress />
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} tagline={dict.footer.tagline} />
    </div>
  );
}
