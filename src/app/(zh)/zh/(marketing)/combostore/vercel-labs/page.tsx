import type { Metadata } from "next";

import { PublisherDirectoryPage } from "@/components/skills/publisher-directory-page";
import { getPublisherProfile } from "@/lib/skills/publisher-profiles";

const { seoTitle: title, seoDescription: description } = getPublisherProfile("vercel-labs")!.zh;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://floatboat.ai/zh/combostore/vercel-labs",
    languages: {
      en: "https://floatboat.ai/combostore/vercel-labs",
      zh: "https://floatboat.ai/zh/combostore/vercel-labs",
    },
  },
  openGraph: { type: "website", title, description, url: "https://floatboat.ai/zh/combostore/vercel-labs" },
};

export default function VercelLabsPage() {
  return <PublisherDirectoryPage locale="zh" handle="vercel-labs" />;
}
