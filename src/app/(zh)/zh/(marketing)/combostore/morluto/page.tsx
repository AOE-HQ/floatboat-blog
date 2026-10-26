import type { Metadata } from "next";

import { PublisherDirectoryPage } from "@/components/skills/publisher-directory-page";
import { getPublisherProfile } from "@/lib/skills/publisher-profiles";

const { seoTitle: title, seoDescription: description } = getPublisherProfile("morluto")!.zh;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://floatboat.ai/zh/combostore/morluto",
    languages: { en: "https://floatboat.ai/combostore/morluto", zh: "https://floatboat.ai/zh/combostore/morluto" },
  },
  openGraph: { type: "website", title, description, url: "https://floatboat.ai/zh/combostore/morluto" },
};

export default function MorlutoPage() {
  return <PublisherDirectoryPage locale="zh" handle="morluto" />;
}
