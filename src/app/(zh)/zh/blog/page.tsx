import type { Metadata } from "next";

import { BlogIndex, BlogShell } from "@openblog/components";

import { site } from "@/config/site";
import { resolveFaqForBlogIndex } from "@/lib/faq-data";
import {
  absoluteBlogIndexUrl,
  openGraphLocale,
} from "@/lib/locale-site";
import { getBlogIndexData } from "@/lib/posts";

const og = openGraphLocale("zh");

export const metadata: Metadata = {
  title: "博客",
  description:
    "关于 AI 队友、自动化与高频协作的笔记。实践向内容：如何给 AI 明确角色、边界与可交付成果。",
  alternates: {
    canonical: absoluteBlogIndexUrl("zh"),
    languages: {
      en: absoluteBlogIndexUrl("en"),
      zh: absoluteBlogIndexUrl("zh"),
      "x-default": absoluteBlogIndexUrl("en"),
    },
  },
  openGraph: {
    title: `博客 | ${site.name}`,
    description:
      "关于 AI 队友、自动化与高频协作的笔记。实践向内容：如何给 AI 明确角色、边界与可交付成果。",
    url: absoluteBlogIndexUrl("zh"),
    siteName: site.name,
    type: "website",
    locale: og.locale,
    alternateLocale: og.alternateLocale,
  },
};

export default function ZhBlogIndexPage() {
  const data = getBlogIndexData("zh");

  return (
    <BlogShell className="py-8 lg:py-12">
      <BlogIndex
        data={data}
        faq={resolveFaqForBlogIndex("zh")}
      />
    </BlogShell>
  );
}
