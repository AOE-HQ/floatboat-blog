/**
 * Resolve a post image for in-app display (img/src, next/image).
 * Keeps site-relative paths on the blog origin; rewrites legacy main-site paths.
 */
export function resolveDisplayImageUrl(src: string | undefined): string | undefined {
  if (!src) {
    return undefined;
  }

  if (src.startsWith("/")) {
    return src;
  }

  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    return `/${src}`;
  }

  try {
    const { pathname } = new URL(src);
    const legacyMainSite = pathname.match(/^\/images\/blog\/([^/]+)\/(.+)$/);
    if (legacyMainSite) {
      return `/blog/images/${legacyMainSite[1]}/${legacyMainSite[2]}`;
    }
    if (pathname.startsWith("/blog/images/")) {
      return pathname;
    }
  } catch {
    return src;
  }

  return src;
}
