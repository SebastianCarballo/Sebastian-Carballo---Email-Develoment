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
        "El dark mode no es opcional: iOS y Gmail lo fuerzan. Declara <meta name=\"color-scheme\" content=\"light dark\"> y :root { color-scheme: light dark; } para que el cliente sepa que soportas ambos esquemas.",
        "## Por qué se rompe tu diseño",
        "Cada cliente invierte a su manera: Apple Mail hace inversión total de colores y Gmail parcial. Si usas PNG transparentes con texto negro o fondos sin declarar, el resultado es un logo invisible o texto ilegible.",
        "El error más común es diseñar solo en modo claro y cruzar los dedos. El dark mode tiene que ser parte del QA, igual que Outlook.",
        "## Patrón a prueba de inversión",
        "Pon el logo sobre un pill blanco o fondo sólido, declara background-color y color en cada celda, y usa el prefijo [data-ogsc] para forzar estilos en la app de Outlook. Testea el mismo envío en Apple Mail iOS, Gmail app y Outlook móvil antes de publicar.",
      ],
      en: [
        "Dark mode is not optional: iOS and Gmail force it. Declare <meta name=\"color-scheme\" content=\"light dark\"> and :root { color-scheme: light dark; } so clients know you support both schemes.",
        "## Why your design breaks",
        "Every client inverts differently: Apple Mail does full inversion, Gmail partial. Transparent PNGs with black text or undeclared backgrounds end up as invisible logos or unreadable text.",
        "The most common mistake is designing light-mode only and hoping for the best. Dark mode belongs in QA, just like Outlook.",
        "## Inversion-proof pattern",
        "Place the logo on a white pill or solid background, declare background-color and color on every cell, and use the [data-ogsc] prefix to force styles in the Outlook app. Test every send on iOS Apple Mail, Gmail app and Outlook mobile before publishing.",
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
        "Outlook usa Word como motor de render. Sin VML no hay border-radius, ni background-image, ni botones redondeados: solo cajas planas.",
        "## El patrón de botón bulletproof",
        "Envuelve un v:roundrect en condicional <!--[if mso]>...<![endif]--> para Outlook y deja un <a> real con estilos inline para el resto. Así cada cliente pinta el botón que entiende.",
        "Lo mismo aplica a hero images con fondo: v:rect con fill de imagen más un bgcolor de fallback para cuando la imagen no carga.",
        "## MJML lo genera, tú lo debugueas",
        "MJML emite el VML automáticamente, pero cuando un cliente reporta un botón roto necesitas leer el output. Aprende a reconocer v:roundrect, v:fill y arcsize para diagnosticar en minutos.",
      ],
      en: [
        "Outlook uses Word as its rendering engine. Without VML there is no border-radius, no background-image, no rounded buttons: only flat boxes.",
        "## The bulletproof button pattern",
        "Wrap a v:roundrect in an <!--[if mso]>...<![endif]--> conditional for Outlook and keep a real <a> with inline styles for everyone else. Each client paints the button it understands.",
        "Same for hero background images: v:rect with image fill plus a bgcolor fallback for when images don't load.",
        "## MJML generates it, you debug it",
        "MJML emits VML automatically, but when a client reports a broken button you need to read the output. Learn to spot v:roundrect, v:fill and arcsize to diagnose in minutes.",
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
        "El 15% de los usuarios usa tecnologías de asistencia. Un email inaccesible no solo excluye: pierde aperturas, clics y ventas.",
        "## Las tres reglas que más convierten",
        "Primero, role=\"presentation\" en todas las tablas de maquetación para que el lector de pantalla lea contenido, no celdas. Segundo, jerarquía real de headings en vez de texto grande con <b>. Tercero, alt descriptivo en cada imagen: nunca \"imagen\" ni textos vacíos en gráficos con datos.",
        "El contraste mínimo es 4.5:1 para texto normal. Verifica el CTA y el texto secundario, que es donde casi todos suspenden.",
        "## Táctil y legible por defecto",
        "Fuente mínima de 14px, interlineado 1.5 y CTA de al menos 44px de alto con 8px de separación entre enlaces. Todo clicable con el pulgar, sin zoom.",
      ],
      en: [
        "About 15% of users rely on assistive tech. An inaccessible email doesn't just exclude people: it loses opens, clicks and sales.",
        "## The three rules that convert most",
        "First, role=\"presentation\" on every layout table so screen readers read content, not cells. Second, a real heading hierarchy instead of big <b> text. Third, descriptive alt on every image: never \"image\" or empty text on data graphics.",
        "Minimum contrast is 4.5:1 for body text. Check the CTA and secondary text, where almost everyone fails.",
        "## Touch-friendly and readable by default",
        "Minimum 14px font, 1.5 line-height and CTAs at least 44px tall with 8px between links. Everything thumb-tappable, no zoom needed.",
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
