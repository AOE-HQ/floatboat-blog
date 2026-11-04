import { seoTitle } from "@/lib/seo-title";
import type { Metadata } from "next";

import { UseCaseHubPage } from "@/components/use-cases/use-case-hub-page";

const searchCopy = { title: seoTitle("AI 职业工作流：实际任务、成果交付与人工审阅"), description: "按研究、咨询、法律、教学、营销与一人公司等方向查找 Floatboat 工作流，比较真实任务、可编辑输出和审阅方式，了解 Agent 可以协助什么，以及哪些判断仍由人负责。" };

export const metadata: Metadata = {
  title: { absolute: searchCopy.title },
  description: searchCopy.description,
  alternates: { canonical: "/zh/use-cases", languages: { en: "/use-cases", "zh-Hans": "/zh/use-cases", "x-default": "/use-cases" } },
  openGraph: { type: "website", title: searchCopy.title, description: searchCopy.description, url: "/zh/use-cases" },
};

export default function UseCasesPage() {
  return <UseCaseHubPage locale="zh" />;
}
