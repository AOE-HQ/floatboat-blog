import type { Metadata } from "next";

import { UseCaseHubPage } from "@/components/use-cases/use-case-hub-page";

export const metadata: Metadata = {
  title: { absolute: "Work Agents by Profession and Use Case | Floatboat" },
  description: "Explore Floatboat Work Agents for professionals, independent operators, and teams, with real assignments, editable deliverables, and human review.",
  alternates: { canonical: "/use-cases", languages: { en: "/use-cases", "zh-Hans": "/zh/use-cases", "x-default": "/use-cases" } },
  openGraph: { type: "website", title: "Work Agents by Profession and Use Case | Floatboat", description: "Find a Work Agent for the profession, assignments, and review boundaries that match how you operate.", url: "/use-cases" },
};

export default function UseCasesPage() {
  return <UseCaseHubPage locale="en" />;
}
