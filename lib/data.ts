// Sanity-ready types. Hoy mock local, mañana GROQ con misma forma.
export type Locale = "es" | "en";

export interface Project {
  slug: string;
  client: string;
  year: string;
  tags: string[];
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  challenge: Record<Locale, string>;
  solution: Record<Locale, string>;
  results: string[];
  featured?: boolean;
}

export interface Post {
  slug: string;
  category: string;
  tags: string[];
  minutes: number;
  date: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string[]>;
}

export const projects: Project[] = [
  {
    slug: "newsletter-fintech",
    client: "Fintech",
    year: "2025",
    tags: ["newsletter", "mjml", "dark-mode"],
    title: { es: "Newsletter Fintech responsive", en: "Responsive fintech newsletter" },
    excerpt: {
      es: "Sistema modular MJML con dark mode y 98/100 en Litmus.",
      en: "Modular MJML system with dark mode and 98/100 on Litmus.",
    },
    challenge: {
      es: "Outlook rompía columnas y el dark mode invertía el logo.",
      en: "Outlook broke columns and dark mode inverted the logo.",
    },
    solution: {
      es: "Tablas híbridas + VML + meta color-scheme + logo con fondo sólido.",
      en: "Hybrid tables + VML + color-scheme meta + logo on solid background.",
    },
    results: ["+22% CTR", "0 quejas Outlook", "100% responsive"],
    featured: true,
  },
  {
    slug: "transaccional-saas",
    client: "SaaS",
    year: "2024",
    tags: ["transactional", "accessible", "html"],
    title: { es: "Emails transaccionales accesibles", en: "Accessible transactional emails" },
    excerpt: {
      es: "Reset password y recibos con contraste AA y texto plano.",
      en: "Password reset and receipts with AA contrast and plain text.",
    },
    challenge: {
      es: "Gmail cortaba el email a los 102KB y faltaba preheader.",
      en: "Gmail clipped the email at 102KB and preheader was missing.",
    },
    solution: {
      es: "Dieta de CSS inline, preheader oculto y versión texto.",
      en: "Inline CSS diet, hidden preheader and text version.",
    },
    results: ["-40% peso", "+15% apertura", "AA pass"],
  },
  {
    slug: "promo-retail",
    client: "Retail",
    year: "2025",
    tags: ["promo", "outlook", "vml"],
    title: { es: "Promo retail con hero VML", en: "Retail promo with VML hero" },
    excerpt: {
      es: "Hero con background en Outlook usando VML.",
      en: "Hero background in Outlook using VML.",
    },
    challenge: {
      es: "Background-image ignorado en Outlook desktop.",
      en: "Background-image ignored in desktop Outlook.",
    },
    solution: {
      es: "Bulletproof background con v:rect + fallback de color.",
      en: "Bulletproof background with v:rect + color fallback.",
    },
    results: ["Render OK Outlook 2016/2019", "+18% conversión"],
  },
];

export const posts: Post[] = [
  {
    slug: "dark-mode-email",
    category: "Dark mode",
    tags: ["css", "outlook", "apple-mail"],
    minutes: 6,
    date: "2026-03-10",
    title: { es: "Dark mode en email sin romper tu diseño", en: "Dark mode in email without breaking design" },
    excerpt: {
      es: "meta color-scheme, mso-conditional y logos a prueba de inversión.",
      en: "color-scheme meta, mso conditionals and inversion-proof logos.",
    },
    body: {
      es: [
        "El dark mode no es opcional: iOS y Gmail lo fuerzan. Declara <meta name=\"color-scheme\" content=\"light dark\"> y :root { color-scheme: light dark; }.",
        "Usa fondos con transparencia mínima y evita PNG con texto negro sobre transparente. Pon el logo sobre un pill blanco.",
        "Testea en Apple Mail (full invert) vs Gmail (partial invert). Son comportamientos distintos.",
      ],
      en: [
        "Dark mode is not optional: iOS and Gmail force it. Declare <meta name=\"color-scheme\" content=\"light dark\"> and :root { color-scheme: light dark; }.",
        "Avoid transparent PNGs with black text. Put the logo on a white pill.",
        "Test on Apple Mail (full invert) vs Gmail (partial invert). They behave differently.",
      ],
    },
  },
  {
    slug: "outlook-vml",
    category: "Outlook",
    tags: ["vml", "tablas", "mjml"],
    minutes: 8,
    date: "2026-02-02",
    title: { es: "Outlook deja de ser tu enemigo: VML esencial", en: "Stop fearing Outlook: essential VML" },
    excerpt: {
      es: "Botones y backgrounds bulletproof con 20 líneas de VML.",
      en: "Bulletproof buttons and backgrounds with 20 lines of VML.",
    },
    body: {
      es: [
        "Outlook usa Word como motor. Sin VML no hay border-radius ni backgrounds.",
        "Patrón botón: <!--[if mso]><v:roundrect>...<![endif]--> + <a> real para el resto.",
        "MJML ya lo genera, pero entiende el output para debuguear.",
      ],
      en: [
        "Outlook uses Word as engine. No VML means no border-radius or backgrounds.",
        "Button pattern: <!--[if mso]><v:roundrect>...<![endif]--> + real <a> for others.",
        "MJML generates it, but learn the output to debug.",
      ],
    },
  },
  {
    slug: "accesibilidad-email",
    category: "Accesibilidad",
    tags: ["a11y", "semántica"],
    minutes: 5,
    date: "2026-01-15",
    title: { es: "Emails accesibles que convierten más", en: "Accessible emails that convert more" },
    excerpt: {
      es: "Contraste, jerarquía de headings y alt útil.",
      en: "Contrast, heading hierarchy and useful alt.",
    },
    body: {
      es: [
        "Usa role=\"presentation\" en tablas de layout y deja headings reales para el contenido.",
        "Alt descriptivo, nunca 'imagen'. Contraste mínimo 4.5:1.",
        "Font-size mínimo 14px, line-height 1.5, CTA de 44px de alto.",
      ],
      en: [
        "Use role=\"presentation\" on layout tables and real headings for content.",
        "Descriptive alt, never 'image'. Minimum 4.5:1 contrast.",
        "Min 14px font, 1.5 line-height, 44px tall CTAs.",
      ],
    },
  },
];

export function getProjects(locale: Locale) {
  return projects.map((p) => ({
    ...p,
    tTitle: p.title[locale],
    tExcerpt: p.excerpt[locale],
  }));
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getPosts(locale: Locale) {
  return posts.map((p) => ({
    ...p,
    tTitle: p.title[locale],
    tExcerpt: p.excerpt[locale],
  }));
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
