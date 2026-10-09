export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://inbox-dev.vercel.app";

export const siteName = "inbox.dev — Email Developer";
export const authorName = "Email Developer";
export const authorJob = "Email Developer — MJML, HTML responsive, dark mode";
export const socials = {
  github: "https://github.com/SebastianCarballo/Sebastian-Carballo---Email-Develoment",
  linkedin: "https://www.linkedin.com/",
  x: "https://x.com/",
};
export const contactEmail = "hola@inbox.dev";

export const keywordsBase = [
  "email developer",
  "email development",
  "MJML",
  "HTML email",
  "responsive email",
  "dark mode email",
  "Outlook VML",
  "email accessibility",
  "deliverability",
  "newsletter",
  "email transaccional",
];

export function canonical(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

// Checklist #1: palabra clave objetivo por página e idioma.
// Cada página ataca una keyword distinta (sin canibalización).
export const keywordsByPage: Record<string, { es: string[]; en: string[] }> = {
  home: {
    es: ["email developer", "email development", "maquetación emails", "MJML", "HTML responsive email"],
    en: ["email developer", "email development", "HTML email", "MJML", "responsive email"],
  },
  about: {
    es: ["quién es email developer", "qué hace un email developer", "especialista email marketing técnico"],
    en: ["about email developer", "what does an email developer do", "email developer skills"],
  },
  work: {
    es: ["portfolio email", "newsletter responsive", "email transaccional", "Outlook VML ejemplos"],
    en: ["email portfolio", "responsive newsletter", "transactional email", "Outlook VML examples"],
  },
  blog: {
    es: ["blog email development", "guía dark mode email", "tutorial MJML", "accesibilidad email"],
    en: ["email development blog", "dark mode email guide", "MJML tutorial", "email accessibility"],
  },
  contact: {
    es: ["contratar email developer", "presupuesto newsletter", "freelance email HTML"],
    en: ["hire email developer", "newsletter quote", "freelance HTML email"],
  },
};
