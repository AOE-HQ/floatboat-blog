import { seoTitle } from "@/lib/seo-title";
import type { Metadata } from "next";

import { ModelsIndexPage } from "@/components/models/models-index-page";

const searchCopy = { title: seoTitle("AI 模型：版本记录、接入路径与任务适配比较"), description: "查看 Floatboat 的推理、编程、长文本、图像和视频模型记录，比较不同系列的任务定位。区分价格页展示、运行配置与客户端可选，使用前核对实际入口和账户条件。" };

export const metadata: Metadata = {
  title: { absolute: searchCopy.title },
  description: searchCopy.description,
  alternates: { canonical: "https://floatboat.ai/zh/models", languages: { en: "https://floatboat.ai/models", zh: "https://floatboat.ai/zh/models" } },
};

export default function ModelsPage() {
  return <ModelsIndexPage locale="zh" />;
}
