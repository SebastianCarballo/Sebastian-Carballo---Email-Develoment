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
