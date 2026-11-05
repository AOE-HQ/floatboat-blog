"use client";

import type { ReactNode } from "react";

import {
  extractToc,
  normalizeFinalCta,
  splitArticleContent,
  type AdjacentPosts,
  type FinalCta,
  type Post,
  type PostMeta,
} from "@openblog/core";

import { useOpenBlog, useSiteHelpers } from "../provider";
import { ArticleFinalCta } from "../optional/article-final-cta";
import { ArticleRelatedPosts } from "../optional/article-related-posts";
import { ArticleSidebar } from "../optional/article-sidebar";
import { AuthorBox } from "../optional/author-box";
import { PrevNext } from "../optional/prev-next";
import { TagsList } from "../optional/tags-list";
import { TldrBlock } from "../optional/tldr-block";
import { BlogShell } from "./blog-shell";
import { categoryLabel } from "./blog-index-copy";
import { Breadcrumbs } from "./breadcrumbs";
import { CategoryBadge } from "./category-badge";
import { Hero } from "./hero";
import { MarkdownContent } from "./markdown-content";
import { PostMetaRow } from "./post-meta";

type ArticleLayoutProps = {
  post: Post;
  pageUrl: string;
  relatedPosts?: PostMeta[];
  adjacentPosts?: AdjacentPosts;
  afterRelated?: ReactNode;
};

function resolveFinalCta(
  parsed: FinalCta | null,
  sidecar: FinalCta | null | undefined,
  slug: string,
  locale: "en" | "zh",
  config: ReturnType<typeof useOpenBlog>["config"],
): FinalCta | null {
  const slugEntry = config.blog?.cta?.slugs?.[slug]?.[locale];
  const fallback = config.blog?.cta?.fallback?.[locale];
  const raw = parsed ?? sidecar ?? slugEntry ?? fallback;

  if (!raw) {
    return null;
  }

  return normalizeFinalCta(raw);
}

export function ArticleLayout({
  post,
  pageUrl,
  relatedPosts = [],
  adjacentPosts = { prev: null, next: null },
  afterRelated,
}: ArticleLayoutProps) {
  const { config, optional, required, features, localePrefix } = useOpenBlog();
  const site = useSiteHelpers();
  const locale = localePrefix === "/zh" ? "zh" : "en";
  const isZh = locale === "zh";

  const { body, finalCta: parsedCta } = splitArticleContent(post.content);
  const finalCta = optional.finalCta
    ? resolveFinalCta(parsedCta, post.finalCta, post.slug, locale, config)
    : null;

  const tocItems = optional.toc
    ? extractToc(body).filter((item) => item.title.toLowerCase() !== "tl;dr")
    : [];
  const showCover = required.featuredImage && Boolean(post.coverImage);
  const showSidebar =
    (optional.toc && tocItems.length > 0) || optional.shareBar;

  const homeUrl =
    config.chrome?.homeUrl ?? config.chrome?.siteUrl ?? site.runtime.siteUrl;

  const breadcrumbItems = [
    {
      name: isZh ? "首页" : "Home",
      href: isZh ? new URL("/zh", homeUrl).href : homeUrl,
    },
    {
      name: isZh ? "博客" : "Blog",
      href: site.blogPath(),
    },
    { name: post.title, href: pageUrl },
  ];

  return (
    <>
    <article>
      {required.breadcrumbs ? <Breadcrumbs items={breadcrumbItems} siteUrl={site.runtime.siteUrl} label={isZh ? "面包屑导航" : "Breadcrumb"} /> : null}
      <Hero
        {...(showCover ? { layout: "split" as const, media: { kind: "image" as const, src: post.coverImage!, alt: "" } } : { layout: "centered" as const })}
        title={post.title}
        description={required.postDek ? post.description : ""}
        metadata={<>
          {features.categories && post.category ? <CategoryBadge category={categoryLabel(post.categorySlug, post.category, locale)} categorySlug={post.categorySlug} /> : null}
          {required.postMeta ? <PostMetaRow author={post.author} showAuthor={features.authors} date={post.date} updated={post.updated} readingMinutes={post.readingMinutes} /> : null}
        </>}
      />
      <BlogShell className="pb-10 lg:pb-14">
        <div
          className={
            showSidebar
              ? "mt-10 grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-start xl:grid-cols-[260px_minmax(0,1fr)]"
              : "mt-10"
          }
        >
          {showSidebar ? (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ArticleSidebar
                tocItems={tocItems}
                showToc={optional.toc}
                showShare={optional.shareBar}
                pageUrl={pageUrl}
                title={post.title}
                isZh={isZh}
              />
            </div>
          ) : null}

          <div className="min-w-0 max-w-[720px]">
            {optional.tldr && post.tldr ? (
              <TldrBlock {...post.tldr} locale={locale} />
            ) : null}

            <div className={optional.tldr && post.tldr ? "mt-8" : undefined}>
              {required.markdown ? (
                <MarkdownContent content={body} />
              ) : null}
            </div>

            {optional.tagsList ? <TagsList tags={post.tags} /> : null}

            {optional.authorBox && post.author ? (
              <AuthorBox author={post.author} />
            ) : null}

            {optional.prevNext ? (
              <PrevNext
                prev={adjacentPosts.prev}
                next={adjacentPosts.next}
                locale={locale}
              />
            ) : null}
          </div>
        </div>

        {optional.relatedPosts && relatedPosts.length > 0 ? (
          <ArticleRelatedPosts posts={relatedPosts} locale={locale} />
        ) : null}

        <p className="sr-only">{pageUrl}</p>
      </BlogShell>
    </article>
    {afterRelated}
    {finalCta ? <BlogShell className="pb-10 lg:pb-14"><ArticleFinalCta {...finalCta} /></BlogShell> : null}
    </>
  );
}
