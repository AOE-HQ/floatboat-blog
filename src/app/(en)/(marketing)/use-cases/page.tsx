import type { Metadata } from "next";

import { UseCaseHubPage } from "@/components/use-cases/use-case-hub-page";

export const metadata: Metadata = {
  title: { absolute: "AI Agent Use Cases by Role and Workflow | Floatboat" },
  description: "Explore Floatboat AI agent use cases for professionals, independent operators, and teams. Browse by work focus, operating model, or work rhythm.",
  alternates: { canonical: "/use-cases", languages: { en: "/use-cases", "zh-Hans": "/zh/use-cases", "x-default": "/use-cases" } },
  openGraph: { type: "website", title: "AI Agent Use Cases by Role and Workflow | Floatboat", description: "Find an AI agent workspace for the work, role, and rhythm that match how you operate.", url: "/use-cases" },
};

export default function UseCasesPage() {
  return <UseCaseHubPage locale="en" />;
}
