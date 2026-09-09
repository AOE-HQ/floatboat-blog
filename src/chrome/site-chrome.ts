import type { OpenBlogChromeNavLink } from "@openblog/core";

import {
  blogPathForLocale,
  type BlogLocale,
} from "@/config/i18n";
import { config } from "@/lib/openblog-config";

export type SiteNavLink = OpenBlogChromeNavLink;

export type SiteFooterColumn = {
  title: string;
  links: SiteNavLink[];
};

export { resolveChromeBrand } from "@openblog/core";
export { config as openblogConfig };

const FLOATBOAT_SITE = "https://floatboat.ai";

export const TAGLINE_ZH = "让日历自动跑活的 Proactive Agent";

/** English nav/footer labels → Chinese for /zh routes. */
const NAV_LABEL_ZH: Record<string, string> = {
  Pricing: "价格",
  About: "关于",
  Download: "下载",
  Docs: "文档",
  Blog: "博客",
  Product: "产品",
  Community: "社区",
  "X (Twitter)": "X（推特）",
  LinkedIn: "领英",
  Discord: "Discord",
  "Privacy Policy": "隐私政策",
  "Terms of Service": "服务条款",
};

function getProductHome(): string {
  return config.chrome?.siteUrl ?? config.chrome?.homeUrl ?? FLOATBOAT_SITE;
}

function localizeBlogLink(
  link: SiteNavLink,
  locale: BlogLocale,
): SiteNavLink {
  if (link.match !== "blog") {
    return link;
  }

  return {
    ...link,
    href: blogPathForLocale(locale),
    label: locale === "zh" ? "博客" : link.label,
  };
}

function localizeLabel(label: string, locale: BlogLocale): string {
  if (locale !== "zh") {
    return label;
  }
  return NAV_LABEL_ZH[label] ?? label;
}

function localizeNavLink(link: SiteNavLink, locale: BlogLocale): SiteNavLink {
  const localized = localizeBlogLink(link, locale);
  return { ...localized, label: localizeLabel(localized.label, locale) };
}

function defaultHeaderLinks(locale: BlogLocale): SiteNavLink[] {
  return [
    { label: "Pricing", href: `${FLOATBOAT_SITE}/pricing`, external: true },
    { label: "About", href: `${FLOATBOAT_SITE}/about`, external: true },
    { label: "Download", href: `${FLOATBOAT_SITE}/download`, external: true },
    {
      label: locale === "zh" ? "博客" : "Blog",
      href: blogPathForLocale(locale),
      match: "blog",
    },
  ];
}

function defaultFooterColumns(locale: BlogLocale): SiteFooterColumn[] {
  return [
    {
      title: locale === "zh" ? "产品" : "Product",
      links: [
        { label: "Pricing", href: `${FLOATBOAT_SITE}/pricing`, external: true },
        { label: "About", href: `${FLOATBOAT_SITE}/about`, external: true },
        { label: "Download", href: `${FLOATBOAT_SITE}/download`, external: true },
        { label: "Docs", href: `${FLOATBOAT_SITE}/docs`, external: true },
      ],
    },
    {
      title: locale === "zh" ? "博客" : "Blog",
      links: [
        {
          label: locale === "zh" ? "博客" : "Blog",
          href: blogPathForLocale(locale),
          match: "blog",
        },
        { label: "Pricing", href: `${FLOATBOAT_SITE}/pricing`, external: true },
      ],
    },
  ];
}

function defaultFooterLegalLinks(): SiteNavLink[] {
  return [
    { label: "Privacy Policy", href: `${FLOATBOAT_SITE}/privacy`, external: true },
    { label: "Terms of Service", href: `${FLOATBOAT_SITE}/terms`, external: true },
  ];
}

/** Header nav for the active blog locale. */
export function getHeaderLinks(locale: BlogLocale = "en"): SiteNavLink[] {
  const base = config.chrome?.nav ?? defaultHeaderLinks(locale);
  return base.map((link) => localizeNavLink(link, locale));
}

/** Footer columns for the active blog locale. */
export function getFooterColumns(locale: BlogLocale = "en"): SiteFooterColumn[] {
  const base = config.chrome?.footer?.columns ?? defaultFooterColumns(locale);
  return base.map((column) => ({
    ...column,
    title: localizeLabel(column.title, locale),
    links: column.links.map((link) => localizeNavLink(link, locale)),
  }));
}

/** Footer legal links for the active blog locale. */
export function getFooterLegalLinks(locale: BlogLocale = "en"): SiteNavLink[] {
  const base = config.chrome?.footer?.legal ?? defaultFooterLegalLinks();
  return base.map((link) => localizeNavLink(link, locale));
}

/** @deprecated Use getHeaderLinks(locale) */
export const headerLinks: SiteNavLink[] = getHeaderLinks("en");

/** @deprecated Use getFooterColumns(locale) */
export const footerColumns: SiteFooterColumn[] = getFooterColumns("en");

/** @deprecated Use getFooterLegalLinks() */
export const footerLegalLinks: SiteNavLink[] = getFooterLegalLinks();

/** @deprecated Use config.chrome.siteUrl */
export const PRODUCT_HOME = getProductHome();
