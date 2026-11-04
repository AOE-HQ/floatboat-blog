import { getArchiveSearchCopy } from "@/lib/blog-archive-metadata";
import { FaqBand } from "@/components/faq-band";
import { getAuthorFaqs } from "@/lib/blog-archive-faqs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryArchive } from "@openblog/components";
import { resolveFeatures, tagToSlug } from "@openblog/core";

import { absoluteUrl, authorPath } from "@/config/site";
import { getAllPosts, getPostsByAuthor } from "@/lib/posts";
import { config } from "@/lib/openblog-config";

const features = resolveFeatures(config);

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveAuthorName(
  posts: ReturnType<typeof getPostsByAuthor>,
  authorSlug: string,
): string {
  return posts.find((post) => post.author && tagToSlug(post.author) === authorSlug)?.author ?? authorSlug;
}

export async function generateStaticParams() {
  if (!features.authors) {
    return [];
  }

  const posts = getAllPosts();
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
  const posts = getPostsByAuthor(slug);

  if (!posts.length) {
    return {};
  }

  const canonical = absoluteUrl(authorPath(slug));

  const search = getArchiveSearchCopy("author", slug, "en");

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

export default async function AuthorPage({ params }: PageProps) {
  if (!features.authors) {
    notFound();
  }

  const { slug } = await params;
  const posts = getPostsByAuthor(slug);

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
        description={`${posts.length} article${posts.length === 1 ? "" : "s"} by ${authorName}.`}
      />
      <FaqBand locale="en" title={`Questions Explored in ${authorName}’s Articles`} description="Explore questions covered in the articles listed here. Each answer links to its original explanation and publication context." items={getAuthorFaqs(slug, "en", posts)} />
    </>
  );
}
