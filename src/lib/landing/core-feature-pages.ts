import type { Metadata } from "next";

import enFloatim from "@/data/landing/en/floatim.json";
import enCoworker from "@/data/landing/en/coworker.json";
import enScheduling from "@/data/landing/en/ai-scheduling-assistant.json";
import enOrganizer from "@/data/landing/en/ai-file-organizer.json";
import zhFloatim from "@/data/landing/zh/floatim.json";
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
    floatim: enFloatim,
    coworker: enCoworker,
    "ai-scheduling-assistant": enScheduling,
    "ai-file-organizer": enOrganizer,
  },
  zh: {
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
  const image = `/blog/landing/${page.slug}/og-${page.locale}.webp`;

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
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: [image],
    },
  };
}

