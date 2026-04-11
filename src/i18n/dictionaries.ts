export type Locale = "es" | "en";

const locales: Locale[] = ["es", "en"];
const defaultLocale: Locale = "es";

const dictionaries = {
  es: () => import("./es.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export const getDictionary = async (locale: string) => {
  const safe = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  return dictionaries[safe]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
