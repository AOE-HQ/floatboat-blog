import { getArchiveSearchCopy } from "@/lib/blog-archive-metadata";
import { FaqBand } from "@/components/faq-band";
import { getCategoryFaqs } from "@/lib/blog-archive-faqs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryArchive } from "@openblog/components";
import { resolveFeatures } from "@openblog/core";

import { absoluteUrl, categoryPath } from "@/config/site";
import { getBlogIndexData, getPostsByCategory } from "@/lib/posts";
import { config } from "@/lib/openblog-config";

const features = resolveFeatures(config);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!features.categories) {
    return [];
  }

  const data = getBlogIndexData();
  return data.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  if (!features.categories) {
    return {};
  }

  const { slug } = await params;
  const posts = getPostsByCategory(slug);

  if (!posts.length) {
    return {};
  }

  const canonical = absoluteUrl(categoryPath(slug));

  const search = getArchiveSearchCopy("category", slug, "en");

  return {
    title: { absolute: search.title },
    description: search.description,
    alternates: { canonical },
    openGraph: {
      title: search.title,
      description: search.description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  if (!features.categories) {
    notFound();
  }

  const { slug } = await params;
  const posts = getPostsByCategory(slug);

  if (!posts.length) {
    notFound();
  }

  const categoryName = posts[0]?.category ?? slug;

  return (
    <>
      <CategoryArchive
        categoryName={categoryName}
        categorySlug={slug}
        posts={posts}
      />
      <FaqBand locale="en" title={`${categoryName}: Reading Questions`} items={getCategoryFaqs(slug, "en")} />
    </>
  );
}
