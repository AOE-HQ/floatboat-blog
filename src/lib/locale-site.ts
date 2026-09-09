import type { Metadata } from "next";
import type { SiteHelpers } from "@openblog/core";

import {
  blogPathForLocale,
  postPathForLocale,
  type BlogLocale,
} from "@/config/i18n";
import { siteHelpers } from "@/lib/openblog-config";

/** Prefix blog paths for zh (/blog/x → /zh/blog/x). English uses base helpers. */
export function createLocaleSiteHelpers(locale: BlogLocale): SiteHelpers {
  if (locale === "en") {
    return siteHelpers;
  }

  const base = siteHelpers;
  const withLocale = (path: string): string => {
    if (path.startsWith("/zh/")) {
      return path;
    }
    // Shared static assets — same path for en/zh (hero + OG images)
    if (path.startsWith("/blog/images/")) {
      return path;
    }
    return `/zh${path}`;
  };

  return {
    ...base,
    blogPath: (...segments: string[]) => withLocale(base.blogPath(...segments)),
    postPath: (slug: string) => withLocale(base.postPath(slug)),
    categoryPath: (slug: string) => withLocale(base.categoryPath(slug)),
    tagPath: (slug: string) => withLocale(base.tagPath(slug)),
    authorPath: (slug: string) => withLocale(base.authorPath(slug)),
    absoluteUrl: (path: string) => base.absoluteUrl(withLocale(path)),
    blogIndexUrl: () => base.absoluteUrl(withLocale(base.blogPath())),
  };
}

export function absolutePostUrl(slug: string, locale: BlogLocale): string {
  return siteHelpers.absoluteUrl(postPathForLocale(locale, slug));
}

export function absoluteBlogIndexUrl(locale: BlogLocale): string {
  return siteHelpers.absoluteUrl(blogPathForLocale(locale));
}

/** hreflang alternates — mirrors Alignify blog post metadata pattern. */
export function buildPostLanguageAlternates(slug: string): Metadata["alternates"] {
  return {
    canonical: absolutePostUrl(slug, "en"),
    languages: {
      en: absolutePostUrl(slug, "en"),
      zh: absolutePostUrl(slug, "zh"),
      "x-default": absolutePostUrl(slug, "en"),
    },
  };
}

export function buildPostLanguageAlternatesForLocale(
  slug: string,
  locale: BlogLocale,
): Metadata["alternates"] {
  const languages = {
    en: absolutePostUrl(slug, "en"),
    zh: absolutePostUrl(slug, "zh"),
    "x-default": absolutePostUrl(slug, "en"),
  };
  return {
    canonical: absolutePostUrl(slug, locale),
    languages,
  };
}

export function openGraphLocale(locale: BlogLocale): {
  locale: string;
  alternateLocale: string;
} {
  return locale === "zh"
    ? { locale: "zh_CN", alternateLocale: "en_US" }
    : { locale: "en_US", alternateLocale: "zh_CN" };
}
