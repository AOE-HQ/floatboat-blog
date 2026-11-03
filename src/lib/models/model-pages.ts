import { localizedHowToSchema, type LocalizedHowStep } from "@/lib/marketing/how-to";
import { localizedUseCasesSchema, type LocalizedUseCases } from "@/lib/marketing/use-cases";
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
export type ModelAvailability = "picker" | "combo" | "configured" | "announced" | "routing";
const AVAILABILITY_LABELS: Record<ModelAvailability, Localized> = {
  picker: { en: "Recorded chat entry", zh: "已有对话接入记录" },
  combo: { en: "Recorded Combo entry", zh: "已有 Combo 接入记录" },
  configured: { en: "Configuration record", zh: "底层配置记录" },
  announced: { en: "Listed on pricing page", zh: "价格页已展示" },
  routing: { en: "Automatic routing", zh: "自动路由" },
};
export function modelAvailabilityLabel(availability: ModelAvailability, locale: ModelLocale) {
  return AVAILABILITY_LABELS[availability][locale];
}

type Card = {
  availability: ModelAvailability;
  source?: { url: string; checkedAt: string };
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
    title: Localized;
    description: Localized;
    traits: Array<{
      label: Localized;
      value: Localized;
      description: Localized;
    }>;
  };
  lineup: {
    title: Localized;
    description: Localized;
    items: Card[];
  };
  useCases: LocalizedUseCases;
  capabilities: {
    title: Localized;
    description: Localized;
    items: ContentItem[];
  };
  selection: {
    title: Localized;
    choose: { title: Localized; items: Localized[] };
    alternative: { title: Localized; items: Localized[] };
  };
  mechanism?: { title: Localized; items: ContentItem[] };
  howTo?: { title: Localized; description: Localized; items: LocalizedHowStep[] };
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

for (const model of MODEL_FAMILIES) {
  localizedUseCasesSchema.parse(model.useCases);
  if (model.howTo) localizedHowToSchema.parse(model.howTo);
}

export function localize(value: Localized, locale: ModelLocale) {
  return value[locale];
}

export function getModelFamily(slug: string): ModelFamily | undefined {
  return MODEL_FAMILIES.find((model) => model.slug === slug);
}

export function modelPath(locale: ModelLocale, slug?: ModelSlug) {
  return `${locale === "zh" ? "/zh" : ""}/models${slug ? `/${slug}` : ""}`;
}
