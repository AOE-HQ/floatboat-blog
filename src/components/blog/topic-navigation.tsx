import Link from "next/link";
import { BLOG_COLLECTIONS } from "@/lib/blog-library";

export function BlogTopicNavigation({ categories, locale }: {
  categories: { slug: string; name: string; count: number }[];
  locale: "en" | "zh";
}) {
  if (categories.length === 0) return null;
  const prefix = locale === "zh" ? "/zh" : "";
  return <nav aria-labelledby="blog-topics-title">
    <h2 id="blog-topics-title" className="text-2xl font-semibold sm:text-3xl">{locale === "zh" ? "从你要解决的问题开始" : "Start with the work you need to do"}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-muted)]">{locale === "zh" ? "先选择任务方向，再进入相应分类查找概念解读、工具对比和具体方法。" : "Choose a task below to find the relevant explanations, comparisons, and practical methods in each collection."}</p>
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{BLOG_COLLECTIONS.map(collection => {
      const category = categories.find(c => c.slug === collection.slug);
      if (!category) return null;
      const copy = collection[locale];
      return <li key={category.slug}><Link href={`${prefix}/blog/category/${category.slug}`} className="block h-full rounded-2xl bg-[var(--ob-color-surface)] p-5 transition hover:bg-[var(--ob-color-border)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-accent)]">
        <h3 className="text-lg font-semibold">{copy.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ob-color-muted)]">{copy.description}</p><p className="mt-4 text-sm">{locale === "zh" ? `${category.count} 篇文章 · 浏览分类 →` : `${category.count} articles · Explore collection →`}</p>
      </Link></li>;
    })}</ul>
  </nav>;
}
