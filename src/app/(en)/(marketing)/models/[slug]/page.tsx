import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModelDetailPage } from "@/components/models/model-detail-page";
import {
  MODEL_SLUGS,
  getModelFamily,
  localize,
  modelPath,
} from "@/lib/models/model-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODEL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelFamily(slug);
  if (!model) return {};
  const canonical = `https://floatboat.ai${modelPath("en", model.slug)}`;
  return {
    title: localize(model.seo.title, "en"),
    description: localize(model.seo.description, "en"),
    keywords: model.seo.keywords.map((keyword) => localize(keyword, "en")),
    alternates: {
      canonical,
      languages: {
        en: canonical,
        zh: `https://floatboat.ai${modelPath("zh", model.slug)}`,
      },
    },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModelFamily(slug);
  if (!model) notFound();
  return <ModelDetailPage model={model} locale="en" />;
}
