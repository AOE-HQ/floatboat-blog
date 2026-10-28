import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublisherDirectoryPage } from "@/components/skills/publisher-directory-page";
import { getPublisherProfile } from "@/lib/skills/publisher-profiles";

export function generateMetadata(): Metadata {
  const profile = getPublisherProfile("morluto");
  if (!profile) return {};
  const { seoTitle: title, seoDescription: description } = profile.zh;
  const canonical = "https://floatboat.ai/zh/skills-marketplace/morluto";
  return {
    title,
    description,
    alternates: { canonical, languages: { en: "https://floatboat.ai/skills-marketplace/morluto", zh: "https://floatboat.ai/zh/skills-marketplace/morluto" } },
    openGraph: { type: "website", title, description, url: canonical },
  };
}

export default function MorlutoPage() {
  if (!getPublisherProfile("morluto")) notFound();
  return <PublisherDirectoryPage locale="zh" handle="morluto" />;
}
