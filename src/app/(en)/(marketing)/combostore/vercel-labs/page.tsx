import type { Metadata } from "next";

import { SkillPublisherPage } from "@/components/skills/skill-publisher-page";

const title = "Vercel Labs Skills Directory: React, Design, Deployment & Browser";
const description = "Browse Floatboat's guides to selected Vercel Labs agent skills. Compare React, design, writing, deployment, optimization, and browser workflows, then check each original SKILL.md.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://floatboat.ai/combostore/vercel-labs",
    languages: {
      en: "https://floatboat.ai/combostore/vercel-labs",
      zh: "https://floatboat.ai/zh/combostore/vercel-labs",
    },
  },
  openGraph: { type: "website", title, description, url: "https://floatboat.ai/combostore/vercel-labs" },
};

export default function VercelLabsPage() {
  return <SkillPublisherPage locale="en" />;
}
