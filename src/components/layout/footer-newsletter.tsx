"use client";

import { usePathname } from "next/navigation";

import { resolveNewsletterForPost } from "@/lib/newsletter-data";
import type { SiteFooterLocale } from "@/lib/site-footer-contract";

import { NewsletterSubscribe } from "./newsletter-subscribe";

export function FooterNewsletter({ locale }: { locale: SiteFooterLocale }) {
  const pathname = usePathname() ?? "/";
  const pattern = locale === "zh" ? /^\/zh\/blog\/([^/]+)\/?$/ : /^\/blog\/([^/]+)\/?$/;
  const slug = pattern.exec(pathname)?.[1] ?? null;

  return (
    <div className="px-10 pt-12 pb-8 max-lg:px-5">
      <NewsletterSubscribe copy={resolveNewsletterForPost(slug, locale)} />
    </div>
  );
}
