import type { Metadata } from "next";

import { ModelsIndexPage } from "@/components/models/models-index-page";

export const metadata: Metadata = {
  title: "AI Models in Floatboat — One Agent Workspace",
  description: "Explore Floatboat models live in the client picker, built-in multimedia Combos, and configured capacity below the picker.",
  alternates: { canonical: "https://floatboat.ai/models", languages: { en: "https://floatboat.ai/models", zh: "https://floatboat.ai/zh/models" } },
};

export default function ModelsPage() {
  return <ModelsIndexPage locale="en" />;
}
