export type BlogIndexLocale = "en" | "zh";

export const BLOG_INDEX_COPY: Record<
  BlogIndexLocale,
  {
    title: string;
    dek: string;
    featured: string;
    readArticle: string;
    latest: string;
    byTopic: string;
    browseTopics: string;
    viewAll: string;
    articleCount: (count: number) => string;
    minRead: (minutes: number) => string;
  }
> = {
  en: {
    title: "Blog",
    dek: "Notes on AI teammates, automation, and high-frequency communication. Practical writing about giving AI a real role, clear boundaries, and useful handoffs.",
    featured: "Featured",
    readArticle: "Read article",
    latest: "Latest",
    byTopic: "By topic",
    browseTopics: "Browse topics",
    viewAll: "View all",
    articleCount: (count) =>
      count === 1 ? "1 article" : `${count} articles`,
    minRead: (minutes) => `${minutes} min read`,
  },
  zh: {
    title: "博客",
    dek: "关于 AI 队友、自动化与高频协作的笔记。实践向内容：如何给 AI 明确角色、边界与可交付成果。",
    featured: "精选",
    readArticle: "阅读全文",
    latest: "最新",
    byTopic: "按主题",
    browseTopics: "浏览主题",
    viewAll: "查看全部",
    articleCount: (count) => `${count} 篇文章`,
    minRead: (minutes) => `${minutes} 分钟阅读`,
  },
};
