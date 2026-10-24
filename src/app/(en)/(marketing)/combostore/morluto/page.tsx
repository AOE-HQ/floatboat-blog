import type { Metadata } from "next";

import { MorlutoPublisherPage } from "@/components/skills/morluto-publisher-page";

const title = "morluto Agent Skills: REA & Generate Social Preview";
const description = "Explore morluto's verified Agent Skills for reverse engineering with REA and creating repository social previews. Compare use cases and read the original SKILL.md files.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://floatboat.ai/combostore/morluto",
    languages: { en: "https://floatboat.ai/combostore/morluto", zh: "https://floatboat.ai/zh/combostore/morluto" },
  },
  openGraph: { type: "website", title, description, url: "https://floatboat.ai/combostore/morluto" },
};

export default function MorlutoPage() {
  return <MorlutoPublisherPage locale="en" />;
}
