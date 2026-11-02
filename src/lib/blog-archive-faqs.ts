import type { FaqItem, PostMeta } from "@openblog/core";
import { tagToSlug } from "@openblog/core";

import categoryFaqs from "@/data/blog-category-faqs.json";
import authorSelections from "@/data/blog-author-faq-selections.json";
import { getPostBySlug } from "@/lib/posts";

type Locale = "en" | "zh";

export function getCategoryFaqs(slug: string, locale: Locale): FaqItem[] {
  const entry = categoryFaqs[slug as keyof typeof categoryFaqs];
  if (!entry) throw new Error(`Missing category FAQ: ${locale}/${slug}`);
  return entry[locale];
}

/** Author archives curate published article answers; they do not assert biographies. */
export function getAuthorFaqs(slug: string, locale: Locale, posts: PostMeta[]): FaqItem[] {
  const selections = authorSelections[slug as keyof typeof authorSelections];
  if (!selections) throw new Error(`Missing author FAQ selection: ${locale}/${slug}`);
  return selections.map(({ article, questionIndex }) => {
    const post = getPostBySlug(article, locale);
    const item = post?.faq?.[questionIndex];
    if (!post || tagToSlug(post.author ?? "") !== slug || !posts.some((entry) => entry.slug === article) || !item) {
      throw new Error(`Invalid author FAQ source: ${locale}/${slug}/${article}#${questionIndex}`);
    }
    const href = `https://floatboat.ai${locale === "zh" ? "/zh" : ""}/blog/${post.slug}`;
    return {
      question: item.question,
      answer: `${item.answer}\n\n${locale === "zh" ? "出处" : "Source"}: [${post.title}](${href})`,
    };
  });
}
