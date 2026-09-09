import tldrData from "@/data/tldr-data.json";

import type { TldrContent } from "@openblog/core";

export type TldrEntry = TldrContent;

interface TldrConfig {
  pages: Record<string, TldrEntry>;
}

const config = tldrData as TldrConfig;

/** Normalize pageUrl or pathname to a lookup key like `/blog/foo` or `/zh/blog/foo`. */
export function pageUrlToTldrPath(pageUrl: string | undefined): string | null {
  if (!pageUrl) {
    return null;
  }

  let path = pageUrl.trim();

  try {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      path = new URL(path).pathname;
    }
  } catch {
    return null;
  }

  if (!path.startsWith("/")) {
    return null;
  }

  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path;
}

export function resolveTldr(pageUrl: string | undefined): TldrEntry | null {
  const path = pageUrlToTldrPath(pageUrl);
  if (!path) {
    return null;
  }

  return config.pages[path] ?? null;
}

export function resolveTldrForPost(
  slug: string,
  locale: "en" | "zh",
): TldrEntry | null {
  const prefix = locale === "zh" ? "/zh/blog" : "/blog";
  return config.pages[`${prefix}/${slug}`] ?? null;
}
