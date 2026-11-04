import { seoTitle } from "@/lib/seo-title";
import type { Metadata } from "next";

import { UseCaseHubPage } from "@/components/use-cases/use-case-hub-page";

const searchCopy = { title: seoTitle("AI Workflows by Profession: Tasks, Deliverables, and Review"), description: "Find Floatboat workflows for research, consulting, law, teaching, marketing, and solo work. Compare real assignments, editable outputs, and the decisions people retain." };

export const metadata: Metadata = {
  title: { absolute: searchCopy.title },
  description: searchCopy.description,
  alternates: { canonical: "/use-cases", languages: { en: "/use-cases", "zh-Hans": "/zh/use-cases", "x-default": "/use-cases" } },
  openGraph: { type: "website", title: searchCopy.title, description: searchCopy.description, url: "/use-cases" },
};

export default function UseCasesPage() {
  return <UseCaseHubPage locale="en" />;
}
