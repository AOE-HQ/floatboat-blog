/**
 * Floatboat blog i18n — en + zh only.
 *
 * Content layout:
 *   content/blog/*.md      — English
 *   content/blog/zh/*.md   — Chinese
 *
 * Routes:
 *   /blog/{slug}     — English
 *   /zh/blog/{slug}  — Chinese
 */

export type BlogLocale = "en" | "zh";

export const DEFAULT_LOCALE: BlogLocale = "en";

export const SUPPORTED_LOCALES: readonly BlogLocale[] = ["en", "zh"] as const;

export const LOCALE_LABELS: Record<BlogLocale, string> = {
  en: "English",
  zh: "中文",
};

/** URL prefix on floatboat.ai (en has no prefix). */
export function localeUrlPrefix(locale: BlogLocale): string {
  if (locale === "en") return "";
  return `/${locale}`;
}

/** Blog list path for a locale, e.g. /blog or /zh/blog */
export function blogPathForLocale(locale: BlogLocale): string {
  const prefix = localeUrlPrefix(locale);
  return `${prefix}/blog`;
}

/** Post path for a locale, e.g. /blog/{slug} or /zh/blog/{slug} */
export function postPathForLocale(locale: BlogLocale, slug: string): string {
  return `${blogPathForLocale(locale)}/${slug}`;
}
