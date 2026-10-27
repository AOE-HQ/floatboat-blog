import { buildSitemapXml } from "@openblog/core";

import type { BlogLocale } from "@/config/i18n";
import { SUPPORTED_LOCALES } from "@/config/i18n";
import { getAllPosts } from "@/lib/posts";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
import { siteHelpers } from "@/lib/openblog-config";
import { PERSONA_SLUGS } from "@/lib/use-cases/persona-pages";
import { FEATURED_SKILLS, skillPath } from "@/lib/skills/featured-skills";
import { skillCategoryPath, SKILL_CATEGORY_SLUGS } from "@/lib/skills/skill-categories";
import { PUBLISHER_PROFILE_HANDLES, publisherProfilePath } from "@/lib/skills/publisher-profiles";

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

  const personaPages = PERSONA_SLUGS.flatMap((slug) => [
    `https://floatboat.ai/use-cases/${slug}`,
    `https://floatboat.ai/zh/use-cases/${slug}`,
  ]).concat(["https://floatboat.ai/use-cases", "https://floatboat.ai/zh/use-cases"]).map((url) => `<url><loc>${url}</loc></url>`).join("\n");

  const skillPages = [
    "https://floatboat.ai/combostore",
    "https://floatboat.ai/zh/combostore",
    `https://floatboat.ai${skillCategoryPath("en")}`,
    `https://floatboat.ai${skillCategoryPath("zh")}`,
    ...SKILL_CATEGORY_SLUGS.flatMap((slug) => [
      `https://floatboat.ai${skillCategoryPath("en", slug)}`,
      `https://floatboat.ai${skillCategoryPath("zh", slug)}`,
    ]),
    ...PUBLISHER_PROFILE_HANDLES.flatMap((handle) => [
      `https://floatboat.ai${publisherProfilePath("en", handle)}`,
      `https://floatboat.ai${publisherProfilePath("zh", handle)}`,
    ]),
    ...FEATURED_SKILLS.flatMap(({ authorHandle, slug }) => [
      `https://floatboat.ai${skillPath("en", authorHandle, slug)}`,
      `https://floatboat.ai${skillPath("zh", authorHandle, slug)}`,
    ]),
  ].map((url) => `<url><loc>${url}</loc></url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${bodies.join("\n")}
${personaPages}
${skillPages}
</urlset>`;
}
