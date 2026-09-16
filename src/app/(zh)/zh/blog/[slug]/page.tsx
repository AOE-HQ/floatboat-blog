import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout, JsonLd } from "@openblog/components";
import {
  resolveFeatures,
  resolveOptionalComponents,
} from "@openblog/core";

import { config } from "@/lib/openblog-config";
import { FaqBand } from "@/components/faq-band";
import { BlogCtaPopup } from "@/components/blog/cta-popup";
import {
  buildPostLanguageAlternatesForLocale,
  createLocaleSiteHelpers,
  openGraphLocale,
} from "@/lib/locale-site";
import { resolvePopupForPost } from "@/lib/popup-data";
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
import {
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";

const features = resolveFeatures(config);
const locale = "zh" as const;
const helpers = createLocaleSiteHelpers(locale);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/posts");
  return getAllPosts(locale).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  const canonical = helpers.absoluteUrl(helpers.postPath(post.slug));
  const ogImages = buildPostOpenGraphImages(post);
  const og = openGraphLocale(locale);

  return {
    title: post.title,
    description: post.description,
    alternates: buildPostLanguageAlternatesForLocale(slug, locale),
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

export default async function ZhBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const pageUrl = helpers.absoluteUrl(helpers.postPath(post.slug));
  const optional = resolveOptionalComponents(config);
  const relatedPosts = optional.relatedPosts
    ? getRelatedPosts(post, locale)
    : [];
  const adjacentPosts = optional.prevNext
    ? getAdjacentPosts(slug, locale)
    : { prev: null, next: null };
  const breadcrumbs = getArticleBreadcrumbItems(post.title, post.slug, helpers, {
    home: "首页",
    blog: "博客",
  });
  const popup = resolvePopupForPost(post.slug, "zh");

  return (
    <>
      <JsonLd
        data={[
          buildBlogPostingJsonLd(post, helpers),
          buildBreadcrumbJsonLd(breadcrumbs, helpers),
        ]}
      />
      <ArticleLayout
        post={post}
        pageUrl={pageUrl}
        relatedPosts={relatedPosts}
        adjacentPosts={adjacentPosts}
      />
      {post.faq && post.faq.length > 0 ? (
        <FaqBand items={post.faq} locale={locale} />
      ) : null}
      <BlogCtaPopup copy={popup} locale="zh" />
    </>
  );
}
