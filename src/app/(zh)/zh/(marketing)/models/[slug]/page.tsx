import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModelDetailPage } from "@/components/models/model-detail-page";
import { MODEL_SLUGS, getModelFamily, localize, modelPath } from "@/lib/models/model-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODEL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelFamily(slug);
  if (!model) return {};
  const canonical = `https://floatboat.ai${modelPath("zh", model.slug)}`;
  return {
    title: `${model.name} · Floatboat 模型工作空间`,
    description: localize(model.hero.description, "zh"),
    alternates: { canonical, languages: { en: `https://floatboat.ai${modelPath("en", model.slug)}`, zh: canonical } },
  };
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getModelFamily(slug);
  if (!model) notFound();
  return <ModelDetailPage model={model} locale="zh" />;
}
