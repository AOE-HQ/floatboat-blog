import {
  blogPathForLocale,
  type BlogLocale,
} from "@/config/i18n";

/** Detect blog locale from the current pathname. */
export function getLocaleFromPathname(pathname: string): BlogLocale {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    return "zh";
  }
  return "en";
}

/** Path segment after /blog or /zh/blog, or null if not a blog route. */
function blogRelativePath(pathname: string): string | null {
  const zhMatch = pathname.match(/^\/zh\/blog(\/.*)?$/);
  if (zhMatch) {
    return zhMatch[1] ?? "";
  }

  const enMatch = pathname.match(/^\/blog(\/.*)?$/);
  if (enMatch) {
    return enMatch[1] ?? "";
  }

  return null;
}

/** Same blog page in another locale (Alignify-style path mirroring). */
export function pathForLocale(pathname: string, targetLocale: BlogLocale): string {
  const relative = blogRelativePath(pathname);
  if (relative !== null) {
    return `${blogPathForLocale(targetLocale)}${relative}`;
  }

  return blogPathForLocale(targetLocale);
}
