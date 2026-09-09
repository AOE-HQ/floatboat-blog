import { buildSitemapXml } from "@openblog/core";

import type { BlogLocale } from "@/config/i18n";
import { SUPPORTED_LOCALES } from "@/config/i18n";
import { getAllPosts } from "@/lib/posts";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
import { siteHelpers } from "@/lib/openblog-config";

function extractUrlEntries(xml: string): string {
  const match = xml.match(/<urlset[^>]*>([\s\S]*)<\/urlset>/);
  return match?.[1]?.trim() ?? "";
}

/** Merge en + zh sitemap entries into one urlset (Alignify-style bilingual URLs). */
export function buildCombinedSitemapXml(): string {
  const bodies = SUPPORTED_LOCALES.map((locale: BlogLocale) => {
    const posts = getAllPosts(locale);
    const helpers =
      locale === "en" ? siteHelpers : createLocaleSiteHelpers(locale);
    return extractUrlEntries(buildSitemapXml(posts, helpers));
  }).filter(Boolean);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${bodies.join("\n")}
</urlset>`;
}
