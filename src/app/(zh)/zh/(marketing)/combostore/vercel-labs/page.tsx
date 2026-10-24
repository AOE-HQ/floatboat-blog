import type { Metadata } from "next";

import { SkillPublisherPage } from "@/components/skills/skill-publisher-page";

const title = "Vercel Labs Skills 目录：React、设计、部署与浏览器";
const description = "浏览本站收录的 Vercel Labs Agent Skills，按 React 开发、设计与写作审查、部署优化和浏览器任务选择，并核对原始 SKILL.md。";

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
  return <SkillPublisherPage locale="zh" />;
}
