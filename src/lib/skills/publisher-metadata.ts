import type { Metadata } from "next";
import { getProjectForSource } from "@/lib/projects/project-pages";
import { projectShareImagePath } from "@/lib/projects/project-metadata";
import type { SkillLocale } from "./featured-skills";
import { getPublisherProfile, publisherProfilePath } from "./publisher-profiles";

export function buildPublisherMetadata(handle: string, locale: SkillLocale): Metadata {
  const profile = getPublisherProfile(handle);
  if (!profile) return {};
  const canonical = `https://floatboat.ai${publisherProfilePath(locale, handle)}`;
  const english = `https://floatboat.ai${publisherProfilePath("en", handle)}`;
  const chinese = `https://floatboat.ai${publisherProfilePath("zh", handle)}`;
  const title = profile[locale].seoTitle;
  const description = profile[locale].seoDescription;
  const project = profile.projects.map((entry) => getProjectForSource(handle, entry.url)).find(Boolean);
  const images = project ? [{ url: `https://floatboat.ai${projectShareImagePath(handle, project.slug)}`, width: 1200, height: 630, alt: `${profile.name} — ${project.name}` }] : undefined;
  return {
    title: { absolute: title }, description,
    alternates: { canonical, languages: { en: english, "zh-Hans": chinese, "x-default": english } },
    openGraph: { type: "website", siteName: "Floatboat", title, description, url: canonical, locale: locale === "zh" ? "zh_CN" : "en_US", alternateLocale: [locale === "zh" ? "en_US" : "zh_CN"], ...(images ? { images } : {}) },
    ...(images ? { twitter: { card: "summary_large_image" as const, title, description, images } } : {}),
  };
}
