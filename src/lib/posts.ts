import {
  formatPostDate,
  getPostExcerpt,
  extractLeadParagraph,
  extractToc,
  type Post,
  type PostMeta,
} from "@openblog/core";

import type { BlogLocale } from "@/config/i18n";
import { getContentService, CONTENT_DIR } from "@/lib/content";
import { toMeta } from "@openblog/content";
import { createLocaleSiteHelpers } from "@/lib/locale-site";
import { postPathForLocale } from "@/config/i18n";
import { resolveRelatedSlugsForPost } from "@/lib/related-posts-data";
import { resolveFaqForPost } from "@/lib/faq-data";
import { resolveFinalCtaForPost } from "@/lib/final-cta-data";
import { resolveTldrForPost } from "@/lib/tldr-data";

function attachPostSidecars<T extends Post | undefined>(
  post: T,
  locale: BlogLocale,
): T {
  if (!post) {
    return post;
  }

  let next = post;
  const tldr = resolveTldrForPost(post.slug, locale);
  if (tldr && (tldr.introduction || tldr.items.length > 0)) {
    next = { ...next, tldr };
  }

  const faq = resolveFaqForPost(post.slug, locale);
  if (faq.length > 0) {
    next = { ...next, faq };
  }

  const finalCta = resolveFinalCtaForPost(post.slug, locale);
  if (finalCta) {
    next = { ...next, finalCta };
  }

  return next;
}

export function getAllPosts(locale: BlogLocale = "en", includeDrafts = false) {
  return getContentService(locale)
    .listPosts(includeDrafts)
    .map((post) => attachPostSidecars(post, locale)!);
}

export function getPostBySlug(
  slug: string,
  locale: BlogLocale = "en",
  includeDrafts = false,
) {
  return attachPostSidecars(
    getContentService(locale).getPost(slug, includeDrafts),
    locale,
  );
}

export function getBlogIndexData(locale: BlogLocale = "en") {
  return getContentService(locale).getBlogIndexData();
}

export function getPostsByCategory(categorySlug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getPostsByCategory(categorySlug);
}

export function getPostsByTag(tagSlug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getPostsByTag(tagSlug);
}

export function getPostsByAuthor(authorSlug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getPostsByAuthor(authorSlug);
}

export function getRelatedPosts(
  post: PostMeta,
  locale: BlogLocale = "en",
  limit = 3,
): PostMeta[] {
  const slugs = resolveRelatedSlugsForPost(post.slug, locale).slice(0, limit);
  if (!slugs.length) {
    return [];
  }

  const bySlug = new Map(
    getContentService(locale)
      .listPosts()
      .map((candidate) => [candidate.slug, toMeta(candidate)] as const),
  );

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((meta): meta is PostMeta => Boolean(meta));
}

export function getAdjacentPosts(slug: string, locale: BlogLocale = "en") {
  return getContentService(locale).getAdjacentPosts(slug);
}

export function getPostPath(slug: string, locale: BlogLocale = "en") {
  return postPathForLocale(locale, slug);
}

export function getSiteHelpersForLocale(locale: BlogLocale) {
  return createLocaleSiteHelpers(locale);
}

export {
  formatPostDate,
  getPostExcerpt,
  extractLeadParagraph,
  extractToc,
  CONTENT_DIR,
};
