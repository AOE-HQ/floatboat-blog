import type { Metadata } from "next";

import { ModelsIndexPage } from "@/components/models/models-index-page";

export const metadata: Metadata = {
  title: "Floatboat AI 模型：一个 Agent Workspace",
  description: "查看 Floatboat 支持的 Auto Mode、Claude、OpenAI、Gemini、DeepSeek、Kimi、GLM、MiniMax 与 Seedance 模型。",
  alternates: { canonical: "https://floatboat.ai/zh/models", languages: { en: "https://floatboat.ai/models", zh: "https://floatboat.ai/zh/models" } },
};

export default function ModelsPage() {
  return <ModelsIndexPage locale="zh" />;
}
