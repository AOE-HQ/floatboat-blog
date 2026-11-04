import { getArchiveSearchCopy } from "@/lib/blog-archive-metadata";
import { FaqBand } from "@/components/faq-band";
import { getCategoryFaqs } from "@/lib/blog-archive-faqs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CATEGORY_LABELS_ZH, CategoryArchive } from "@openblog/components";
import { resolveFeatures } from "@openblog/core";

import { config } from "@/lib/openblog-config";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
import { getBlogIndexData, getPostsByCategory } from "@/lib/posts";

const features = resolveFeatures(config);
const locale = "zh" as const;
const helpers = createLocaleSiteHelpers(locale);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!features.categories) {
    return [];
  }

  const data = getBlogIndexData(locale);
  return data.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  if (!features.categories) {
    return {};
  }

  const { slug } = await params;
  const posts = getPostsByCategory(slug, locale);

  if (!posts.length) {
    return {};
  }

  const canonical = helpers.absoluteUrl(helpers.categoryPath(slug));

  const search = getArchiveSearchCopy("category", slug, "zh");

  return {
    title: { absolute: search.title },
    description: search.description,
    alternates: { canonical },
    openGraph: {
      title: search.title,
      description: search.description,
      url: canonical,
      type: "website",
      locale: "zh_CN",
    },
  };
}

export default async function ZhCategoryPage({ params }: PageProps) {
  if (!features.categories) {
    notFound();
  }

  const { slug } = await params;
  const posts = getPostsByCategory(slug, locale);

  if (!posts.length) {
    notFound();
  }

  const categoryName = CATEGORY_LABELS_ZH[slug] ?? posts[0]?.category ?? slug;

  return (
    <>
      <CategoryArchive
        categoryName={categoryName}
        categorySlug={slug}
        posts={posts}
      />
      <FaqBand locale="zh" title={`${categoryName} 阅读常见问题`} items={getCategoryFaqs(slug, "zh")} />
    </>
  );
}
