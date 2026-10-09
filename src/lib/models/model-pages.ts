import autoMode from "@/data/models/auto-mode.json";
import claude from "@/data/models/claude.json";
import deepseek from "@/data/models/deepseek.json";
import gemini from "@/data/models/gemini.json";
import glm from "@/data/models/glm.json";
import kimi from "@/data/models/kimi.json";
import minimax from "@/data/models/minimax.json";
import openai from "@/data/models/openai.json";
import qwen from "@/data/models/qwen.json";
import seedance from "@/data/models/seedance.json";

export const MODEL_SLUGS = [
  "auto-mode",
  "claude",
  "openai",
  "gemini",
  "deepseek",
  "seedance",
  "kimi",
  "qwen",
  "glm",
  "minimax",
] as const;

export type ModelSlug = (typeof MODEL_SLUGS)[number];
export type ModelLocale = "en" | "zh";

type Localized = { en: string; zh: string };
type Card = {
  label: Localized;
  title: string;
  description: Localized;
  meta: Localized;
};
type ContentItem = { title: Localized; description: Localized };

export type ModelFamily = {
  slug: ModelSlug;
  name: string;
  access: "picker" | "combo" | "capacity";
  badge: Localized;
  summary: Localized;
  seo: { title: Localized; description: Localized; keywords: Localized[] };
  hero: { title: Localized; description: Localized; prompts: Localized[] };
  facts: Array<{ label: Localized; value: Localized }>;
  positioning: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    traits: Array<{
      label: Localized;
      value: Localized;
      description: Localized;
    }>;
  };
  lineup: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    items: Card[];
  };
  workflows: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    items: Array<{
      title: Localized;
      brief: Localized;
      process: Localized;
      outcome: Localized;
    }>;
  };
  capabilities: {
    eyebrow: Localized;
    title: Localized;
    description: Localized;
    items: ContentItem[];
  };
  selection: {
    title: Localized;
    choose: { title: Localized; items: Localized[] };
    alternative: { title: Localized; items: Localized[] };
  };
  steps?: {
    eyebrow: Localized;
    title: Localized;
    items: Array<{ title: Localized; description: Localized }>;
  };
  extensions?: {
    eyebrow: Localized;
    title: Localized;
    items: Array<{ title: string; description: Localized }>;
  };
  comparison?: {
    title: Localized;
    description: Localized;
    rows: Array<{
      label: Localized;
      values: [Localized, Localized, Localized];
    }>;
  };
  faq: Array<{ question: Localized; answer: Localized }>;
  finalCta: { title: Localized; description: Localized };
};

export const MODEL_FAMILIES = [
  autoMode,
  claude,
  openai,
  gemini,
  deepseek,
  seedance,
  kimi,
  qwen,
  glm,
  minimax,
] as ModelFamily[];

export function localize(value: Localized, locale: ModelLocale) {
  return value[locale];
}

export function getModelFamily(slug: string): ModelFamily | undefined {
  return MODEL_FAMILIES.find((model) => model.slug === slug);
}

export function modelPath(locale: ModelLocale, slug?: ModelSlug) {
  return `${locale === "zh" ? "/zh" : ""}/models${slug ? `/${slug}` : ""}`;
}
