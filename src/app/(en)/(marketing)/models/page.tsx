import type { Metadata } from "next";

import { ModelsIndexPage } from "@/components/models/models-index-page";

export const metadata: Metadata = {
  title: "AI Models in Floatboat — One Agent Workspace",
  description: "Explore Auto Mode and supported Claude, OpenAI, Gemini, DeepSeek, Kimi, GLM, MiniMax, and Seedance models in Floatboat.",
  alternates: { canonical: "https://floatboat.ai/models", languages: { en: "https://floatboat.ai/models", zh: "https://floatboat.ai/zh/models" } },
};

export default function ModelsPage() {
  return <ModelsIndexPage locale="en" />;
}
