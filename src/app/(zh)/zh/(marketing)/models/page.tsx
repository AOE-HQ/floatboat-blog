import type { Metadata } from "next";

import { ModelsIndexPage } from "@/components/models/models-index-page";

export const metadata: Metadata = {
  title: "Floatboat AI 模型：一个 Agent Workspace",
  description: "查看 Floatboat 客户端已上线模型、内置多媒体 Combo，以及已完成底层配置但尚未在主选择器露出的模型。",
  alternates: { canonical: "https://floatboat.ai/zh/models", languages: { en: "https://floatboat.ai/models", zh: "https://floatboat.ai/zh/models" } },
};

export default function ModelsPage() {
  return <ModelsIndexPage locale="zh" />;
}
