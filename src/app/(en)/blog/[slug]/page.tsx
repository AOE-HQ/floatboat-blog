import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout, JsonLd } from "@openblog/components";
import { resolveFeatures, resolveOptionalComponents } from "@openblog/core";

import { BlogCtaPopup } from "@/components/blog/cta-popup";
import { absoluteUrl, postPath } from "@/config/site";
import { config } from "@/lib/openblog-config";
import { resolvePopupForPost } from "@/lib/popup-data";
import { FaqBand } from "@/components/faq-band";
import {
  buildPostLanguageAlternates,
  openGraphLocale,
} from "@/lib/locale-site";
import {
  buildPostOpenGraphImages,
  buildPostTwitterMetadata,
  postOgSiteName,
} from "@/lib/post-og";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  getArticleBreadcrumbItems,
} from "@/lib/schema";
import { getAdjacentPosts, getPostBySlug } from "@/lib/posts";

const features = resolveFeatures(config);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/posts");
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const canonical = absoluteUrl(postPath(post.slug));
  const ogImages = buildPostOpenGraphImages(post);
  const og = openGraphLocale("en");

  return {
    title: post.title,
    description: post.description,
    alternates: buildPostLanguageAlternates(slug),
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      siteName: postOgSiteName(),
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      ...(features.authors && post.author ? { authors: [post.author] } : {}),
      ...(ogImages.length > 0 ? { images: ogImages } : {}),
    },
    twitter: buildPostTwitterMetadata(post),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const pageUrl = absoluteUrl(postPath(post.slug));
  const optional = resolveOptionalComponents(config);
  const adjacentPosts = optional.prevNext ? getAdjacentPosts(slug) : { prev: null, next: null };
  const breadcrumbs = getArticleBreadcrumbItems(post.title, post.slug);
  const popup = resolvePopupForPost(post.slug, "en");

  return (
    <>
      <JsonLd
        data={[
          buildBlogPostingJsonLd(post),
          buildBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <ArticleLayout
        post={post}
        pageUrl={pageUrl}
        adjacentPosts={adjacentPosts}
      />
      {post.faq && post.faq.length > 0 ? (
        <FaqBand items={post.faq} locale="en" />
      ) : null}
      <BlogCtaPopup copy={popup} locale="en" />
    </>
  );
}
