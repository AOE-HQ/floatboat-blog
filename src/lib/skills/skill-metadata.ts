import type { Metadata } from "next";
import { skillPath, type FeaturedSkill, type SkillLocale } from "./featured-skills";

export function skillShareImagePath(author: string, slug: string) {
  return `/blog/images/skill-guides/${author}/${slug}.webp`;
}

export function buildSkillMetadata(skill: FeaturedSkill, locale: SkillLocale): Metadata {
  const canonical = `https://floatboat.ai${skillPath(locale, skill.authorHandle, skill.slug)}`;
  const english = `https://floatboat.ai${skillPath("en", skill.authorHandle, skill.slug)}`;
  const chinese = `https://floatboat.ai${skillPath("zh", skill.authorHandle, skill.slug)}`;
  const title = skill.seo.title[locale];
  const description = skill.seo.description[locale];
  const image = {
    url: `https://floatboat.ai${skillShareImagePath(skill.authorHandle, skill.slug)}`,
    width: 1200,
    height: 630,
    alt: `${skill.name} by ${skill.publisher} — Floatboat Skill Guide`,
  };
  return {
    title,
    description,
    keywords: skill.seo.keywords[locale],
    alternates: { canonical, languages: { en: english, "zh-Hans": chinese, "x-default": english } },
    openGraph: {
      type: "website", siteName: "Floatboat", title, description, url: canonical,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: [locale === "zh" ? "en_US" : "zh_CN"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
  };
}
