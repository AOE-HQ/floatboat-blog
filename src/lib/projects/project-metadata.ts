import type { Metadata } from "next";
import type { SkillLocale } from "@/lib/skills/featured-skills";
import { projectPath, type ProjectPage } from "./project-pages";

export function projectShareImagePath(author: string, slug: string) {
  return `/blog/images/project-guides/${author}/${slug}.webp`;
}

export function buildProjectMetadata(project: ProjectPage, locale: SkillLocale): Metadata {
  const canonical = `https://floatboat.ai${projectPath(locale, project.author, project.slug)}`;
  const english = `https://floatboat.ai${projectPath("en", project.author, project.slug)}`;
  const chinese = `https://floatboat.ai${projectPath("zh", project.author, project.slug)}`;
  const title = project[locale].seoTitle;
  const description = project[locale].description;
  const image = { url: `https://floatboat.ai${projectShareImagePath(project.author, project.slug)}`, width: 1200, height: 630, alt: `${project.name} — Floatboat Project Guide` };
  return {
    title: { absolute: title }, description,
    alternates: { canonical, languages: { en: english, "zh-Hans": chinese, "x-default": english } },
    openGraph: { type: "website", siteName: "Floatboat", title, description, url: canonical, locale: locale === "zh" ? "zh_CN" : "en_US", alternateLocale: [locale === "zh" ? "en_US" : "zh_CN"], images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
  };
}
