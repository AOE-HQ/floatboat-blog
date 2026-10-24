import type { Metadata } from "next";

import { MorlutoPublisherPage } from "@/components/skills/morluto-publisher-page";

const title = "morluto Agent Skills：REA 逆向工程与项目预览图";
const description = "查看 morluto 发布的两项 Agent Skill：REA 配套逆向工程指引与 Generate Social Preview，了解适用任务、工具前提及原始 SKILL.md。";

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
  return <MorlutoPublisherPage locale="zh" />;
}
