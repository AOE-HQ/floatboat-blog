import type { Metadata } from "next";



import { BlogIndex, BlogShell } from "@openblog/components";

import { absoluteUrl, blogPath, site } from "@/config/site";
import { resolveFaqForBlogIndex } from "@/lib/faq-data";
import { absoluteBlogIndexUrl, openGraphLocale } from "@/lib/locale-site";
import { getBlogIndexData } from "@/lib/posts";

const og = openGraphLocale("en");

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on AI teammates, automation, and high-frequency communication. Practical writing about giving AI a real role, clear boundaries, and useful handoffs.",

  alternates: {
    canonical: absoluteBlogIndexUrl("en"),
    languages: {
      en: absoluteBlogIndexUrl("en"),
      zh: absoluteBlogIndexUrl("zh"),
      "x-default": absoluteBlogIndexUrl("en"),
    },
  },

  openGraph: {
    title: `Blog | ${site.name}`,
    description: site.description,
    url: absoluteUrl(blogPath()),
    siteName: site.name,
    type: "website",
    locale: og.locale,
    alternateLocale: og.alternateLocale,
  },
};



export default function BlogIndexPage() {

  const data = getBlogIndexData();



  return (

    <BlogShell className="py-8 lg:py-12">
      <BlogIndex
        data={data}
        faq={resolveFaqForBlogIndex("en")}
      />
    </BlogShell>

  );

}

