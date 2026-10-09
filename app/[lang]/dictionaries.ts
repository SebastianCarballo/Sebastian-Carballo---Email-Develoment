import es from "./dictionaries/es.json";
import en from "./dictionaries/en.json";
import type { Locale } from "@/lib/i18n";

const dictionaries = { es, en } as const;

export type Dictionary = typeof es;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.es;
}
