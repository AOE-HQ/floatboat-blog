import type { Metadata } from "next";

import { UseCaseHubPage } from "@/components/use-cases/use-case-hub-page";

export const metadata: Metadata = {
  title: { absolute: "面向不同职业与场景的 Work Agent | Floatboat" },
  description: "浏览面向专业人士、独立经营者和团队的 Floatboat Work Agent，了解可交付任务、可编辑成果与人工审阅边界。",
  alternates: { canonical: "/zh/use-cases", languages: { en: "/use-cases", "zh-Hans": "/zh/use-cases", "x-default": "/use-cases" } },
  openGraph: { type: "website", title: "面向不同职业与场景的 Work Agent | Floatboat", description: "按照职业、真实任务与审阅边界，找到适合自己工作方式的 Work Agent。", url: "/zh/use-cases" },
};

export default function UseCasesPage() {
  return <UseCaseHubPage locale="zh" />;
}
