import type { Metadata } from "next";

import enFloatim from "@/data/landing/en/floatim.json";
import enAgentWorkspace from "@/data/landing/en/agent-workspace.json";
import enCoworker from "@/data/landing/en/coworker.json";
import enScheduling from "@/data/landing/en/ai-scheduling-assistant.json";
import enOrganizer from "@/data/landing/en/ai-file-organizer.json";
import zhFloatim from "@/data/landing/zh/floatim.json";
import zhAgentWorkspace from "@/data/landing/zh/agent-workspace.json";
import zhCoworker from "@/data/landing/zh/coworker.json";
import zhScheduling from "@/data/landing/zh/ai-scheduling-assistant.json";
import zhOrganizer from "@/data/landing/zh/ai-file-organizer.json";

import {
  coreFeaturePageSchema,
  type CoreFeaturePageData,
} from "./core-feature-schema";

export type CoreFeatureSlug = CoreFeaturePageData["slug"];
export type LandingLocale = CoreFeaturePageData["locale"];

const rawPages = {
  en: {
    "agent-workspace": enAgentWorkspace,
    floatim: enFloatim,
    coworker: enCoworker,
    "ai-scheduling-assistant": enScheduling,
    "ai-file-organizer": enOrganizer,
  },
  zh: {
    "agent-workspace": zhAgentWorkspace,
    floatim: zhFloatim,
    coworker: zhCoworker,
    "ai-scheduling-assistant": zhScheduling,
    "ai-file-organizer": zhOrganizer,
  },
} as const;

export function getCoreFeaturePage(
  locale: LandingLocale,
  slug: CoreFeatureSlug,
): CoreFeaturePageData {
  return coreFeaturePageSchema.parse(rawPages[locale][slug]);
}

export function featurePath(locale: LandingLocale, slug: CoreFeatureSlug) {
  return locale === "zh" ? `/zh/${slug}` : `/${slug}`;
}

export function buildCoreFeatureMetadata(
  page: CoreFeaturePageData,
): Metadata {
  const path = featurePath(page.locale, page.slug);
  const alternatePath = featurePath(page.locale === "en" ? "zh" : "en", page.slug);
  const imageBySlug: Record<CoreFeatureSlug, string> = {
    "agent-workspace": "/blog/images/ai-workspace-agents/1776938869107-4bf55783-56f6-40d6-a60f-b3adf3a971f0.webp",
    floatim: "/blog/images/introducing-floatim/1782710364987-7c54039b-3629-4fbf-846d-062532c5ae38.webp",
    coworker: "/blog/images/ai-workspace-agents/1776938869107-4bf55783-56f6-40d6-a60f-b3adf3a971f0.webp",
    "ai-scheduling-assistant": "/blog/images/ai-scheduling-agent/1782710542623-c3e3520b-3084-478b-82b4-d29dae842c00.webp",
    "ai-file-organizer": `/blog/images/what-is-an-ai-file-organizer/og-${page.locale}.webp`,
  };
  const image = imageBySlug[page.slug];

  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: {
      canonical: path,
      languages: {
        en: page.locale === "en" ? path : alternatePath,
        "zh-Hans": page.locale === "zh" ? path : alternatePath,
        "x-default": `/${page.slug}`,
      },
    },
    openGraph: {
      type: "website",
      title: page.seo.title,
      description: page.seo.description,
      url: path,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: [image],
    },
  };
}
