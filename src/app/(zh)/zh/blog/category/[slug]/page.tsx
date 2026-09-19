import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CATEGORY_LABELS_ZH, CategoryArchive, JsonLd } from "@openblog/components";
import { resolveFeatures } from "@openblog/core";

import { config } from "@/lib/openblog-config";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
import { buildBreadcrumbJsonLd, getCategoryBreadcrumbItems } from "@/lib/schema";
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

  const categoryName = CATEGORY_LABELS_ZH[slug] ?? posts[0]?.category ?? slug;
  const canonical = helpers.absoluteUrl(helpers.categoryPath(slug));

  return {
    title: `${categoryName} | 博客`,
    description: `${categoryName} 分类下的文章。`,
    alternates: { canonical },
    openGraph: {
      title: `${categoryName} | 博客`,
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
  const breadcrumbs = getCategoryBreadcrumbItems(categoryName, slug, helpers, {
    home: "首页",
    blog: "博客",
  });

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs, helpers)} />
      <CategoryArchive
        categoryName={categoryName}
        categorySlug={slug}
        posts={posts}
      />
    </>
  );
}
