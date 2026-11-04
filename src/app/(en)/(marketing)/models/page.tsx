import { seoTitle } from "@/lib/seo-title";
import type { Metadata } from "next";

import { ModelsIndexPage } from "@/components/models/models-index-page";

const searchCopy = { title: seoTitle("AI Models: Compare Recorded Versions, Routes, and Task Fit"), description: "Compare Floatboat model records for reasoning, coding, long text, images, and video. Distinguish pricing-page listings, runtime configuration, and selectable client access." };

export const metadata: Metadata = {
  title: { absolute: searchCopy.title },
  description: searchCopy.description,
  alternates: { canonical: "https://floatboat.ai/models", languages: { en: "https://floatboat.ai/models", zh: "https://floatboat.ai/zh/models" } },
};

export default function ModelsPage() {
  return <ModelsIndexPage locale="en" />;
}
