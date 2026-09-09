import faqData from "@/data/faq-data.json";

import type { FaqItem } from "@openblog/core";

export type FaqEntry = {
  items: FaqItem[];
};

interface FaqConfig {
  pages: Record<string, FaqEntry>;
}

const config = faqData as FaqConfig;

export function resolveFaqForPost(
  slug: string,
  locale: "en" | "zh",
): FaqItem[] {
  const prefix = locale === "zh" ? "/zh/blog" : "/blog";
  return config.pages[`${prefix}/${slug}`]?.items ?? [];
}

export function resolveFaqForBlogIndex(locale: "en" | "zh"): FaqItem[] {
  const path = locale === "zh" ? "/zh/blog" : "/blog";
  return config.pages[path]?.items ?? [];
}
