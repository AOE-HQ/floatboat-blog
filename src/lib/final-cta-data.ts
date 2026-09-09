import finalCtaData from "@/data/final-cta-data.json";

import type { FinalCta, FinalCtaInput } from "@openblog/core";
import { normalizeFinalCta } from "@openblog/core";

type FinalCtaLocaleCopy = FinalCtaInput;

interface FinalCtaConfig {
  slugs: Record<string, { en?: FinalCtaLocaleCopy; zh?: FinalCtaLocaleCopy }>;
}

const config = finalCtaData as FinalCtaConfig;

export function resolveFinalCtaForPost(
  slug: string,
  locale: "en" | "zh",
): FinalCta | null {
  const entry = config.slugs[slug]?.[locale];
  return entry ? normalizeFinalCta(entry) : null;
}

export function listFinalCtaSlugs(): string[] {
  return Object.keys(config.slugs);
}
