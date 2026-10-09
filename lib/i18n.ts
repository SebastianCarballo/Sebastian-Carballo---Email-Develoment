export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function hasLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}
