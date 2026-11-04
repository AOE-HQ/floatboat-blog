import { getArchiveSearchCopy } from "@/lib/blog-archive-metadata";
import { FaqBand } from "@/components/faq-band";
import { getAuthorFaqs } from "@/lib/blog-archive-faqs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryArchive } from "@openblog/components";
import { resolveFeatures, tagToSlug } from "@openblog/core";

import { config } from "@/lib/openblog-config";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
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

  const canonical = helpers.absoluteUrl(helpers.authorPath(slug));

  const search = getArchiveSearchCopy("author", slug, "zh");

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

  return (
    <>
      <CategoryArchive
        archiveType="author"
        categoryName={authorName}
        categorySlug={slug}
        posts={posts}
        description={`${authorName} 共 ${posts.length} 篇文章。`}
      />
      <FaqBand locale="zh" title={`${authorName} 文章中的主题问答`} description="从本页收录的文章中选读主题问答，可沿每条出处继续查看完整解释与发布背景。" items={getAuthorFaqs(slug, "zh", posts)} />
    </>
  );
}
