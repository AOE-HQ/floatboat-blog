import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublisherDirectoryPage } from "@/components/skills/publisher-directory-page";
import { getPublisherProfile } from "@/lib/skills/publisher-profiles";

export function generateMetadata(): Metadata {
  const profile = getPublisherProfile("vercel-labs");
  if (!profile) return {};
  const { seoTitle: title, seoDescription: description } = profile.en;
  const canonical = "https://floatboat.ai/skills-marketplace/vercel-labs";
  return {
    title,
    description,
    alternates: { canonical, languages: { en: "https://floatboat.ai/skills-marketplace/vercel-labs", zh: "https://floatboat.ai/zh/skills-marketplace/vercel-labs" } },
    openGraph: { type: "website", title, description, url: canonical },
  };
}

export default function VercelLabsPage() {
  if (!getPublisherProfile("vercel-labs")) notFound();
  return <PublisherDirectoryPage locale="en" handle="vercel-labs" />;
}
