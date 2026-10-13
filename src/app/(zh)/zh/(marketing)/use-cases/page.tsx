import type { Metadata } from "next";

import { UseCaseHubPage } from "@/components/use-cases/use-case-hub-page";

export const metadata: Metadata = {
  title: { absolute: "AI Agent 使用场景：按职业与工作流浏览 | Floatboat" },
  description: "浏览适合专业人士、独立经营者和团队的 Floatboat AI Agent 使用场景，可按工作重点、工作方式和工作节奏筛选。",
  alternates: { canonical: "/zh/use-cases", languages: { en: "/use-cases", "zh-Hans": "/zh/use-cases", "x-default": "/use-cases" } },
  openGraph: { type: "website", title: "AI Agent 使用场景：按职业与工作流浏览 | Floatboat", description: "按照工作任务、职业角色和执行节奏，找到适合自己的 AI Agent Workspace。", url: "/zh/use-cases" },
};

export default function UseCasesPage() {
  return <UseCaseHubPage locale="zh" />;
}
