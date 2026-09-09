import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryArchive, JsonLd } from "@openblog/components";
import { resolveFeatures, tagToSlug } from "@openblog/core";

import { config } from "@/lib/openblog-config";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
import { buildBreadcrumbJsonLd } from "@/lib/schema";
import { getAllPosts, getPostsByAuthor } from "@/lib/posts";

const features = resolveFeatures(config);
const locale = "zh" as const;
const helpers = createLocaleSiteHelpers(locale);

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveAuthorName(
  posts: ReturnType<typeof getPostsByAuthor>,
  authorSlug: string,
): string {
  return (
    posts.find((post) => post.author && tagToSlug(post.author) === authorSlug)
      ?.author ?? authorSlug
  );
}

export async function generateStaticParams() {
  if (!features.authors) {
    return [];
  }

  const posts = getAllPosts(locale);
  const slugs = new Set(
    posts
      .map((post) => (post.author ? tagToSlug(post.author) : undefined))
      .filter((slug): slug is string => Boolean(slug)),
  );

  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!features.authors) {
    return {};
  }

  const { slug } = await params;
  const posts = getPostsByAuthor(slug, locale);

  if (!posts.length) {
    return {};
  }

  const authorName = resolveAuthorName(posts, slug);
  const canonical = helpers.absoluteUrl(helpers.authorPath(slug));

  return {
    title: `${authorName} | 博客`,
    description: `${authorName} 撰写的文章。`,
    alternates: { canonical },
    openGraph: {
      title: `${authorName} | 博客`,
      url: canonical,
      type: "website",
      locale: "zh_CN",
    },
  };
}

export default async function ZhAuthorPage({ params }: PageProps) {
  if (!features.authors) {
    notFound();
  }

  const { slug } = await params;
  const posts = getPostsByAuthor(slug, locale);

  if (!posts.length) {
    notFound();
  }

  const authorName = resolveAuthorName(posts, slug);
  const breadcrumbs = [
    { name: "博客", path: helpers.blogPath() },
    { name: authorName, path: helpers.authorPath(slug) },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs, helpers)} />
      <CategoryArchive
        categoryName={authorName}
        categorySlug={slug}
        posts={posts}
        description={`${authorName} 共 ${posts.length} 篇文章。`}
      />
    </>
  );
}
