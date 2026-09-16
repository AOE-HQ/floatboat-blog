"use client";

import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getLocaleFromPathname } from "@/lib/locale-path";

const FB_SITE = "https://floatboat.ai";

const DOWNLOAD_QUERY =
  "?from=landing&download_placement=landing_primary&download_entry_point=landing_header";

const NAV_LINKS = [
  { en: "Pricing", zh: "价格", href: `${FB_SITE}/pricing`, zhHref: `${FB_SITE}/zh/pricing` },
  { en: "About", zh: "关于", href: `${FB_SITE}/about`, zhHref: `${FB_SITE}/zh/about` },
];

/**
 * Header chrome copied 1:1 from floatboat.ai (same bar, spacing, nav and CTA):
 * warm translucent blur bar without border, logo → main home, nav always
 * visible and centered, right cluster (language + Download pill) hidden below
 * md. Only deviations: the logo asset is served from /blog/brand and the
 * language control is a working EN↔中文 toggle instead of a dropdown.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const isZh = locale === "zh";

  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(240,238,235,0.8)] backdrop-blur-[16px]">
      <div className="mx-auto max-w-[1440px] px-10 max-lg:px-5">
        <div className="flex h-[76px] items-center gap-5">
          <div className="flex-1">
            <a
              href={isZh ? `${FB_SITE}/zh` : FB_SITE}
              target="_self"
              aria-label="floatboat"
              title="floatboat"
              className="inline-flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/blog/brand/floatboat-logo.svg"
                alt="floatboat"
                width={126}
                height={36}
                className="h-8 w-auto"
              />
            </a>
          </div>

          <nav
            aria-label="Primary"
            className="relative flex max-w-max flex-1 shrink-0 items-center justify-center"
          >
            <ul className="flex flex-1 list-none items-center justify-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.en}>
                  <a
                    target="_self"
                    aria-label={isZh ? link.zh : link.en}
                    title={isZh ? link.zh : link.en}
                    href={isZh ? link.zhHref : link.href}
                    className="flex h-10 items-center justify-center rounded-md px-0 text-sm font-medium text-[#7a7671] transition-colors hover:text-[#1b1a18]"
                  >
                    <span>{isZh ? link.zh : link.en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
            <LanguageSwitcher />
            <a
              className="inline-flex h-9 min-h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full px-[14px] text-[14px] font-medium leading-[20px] transition-colors bg-[#f7d68b] text-[#1b1a18] hover:bg-[#f3cf79]"
              title={isZh ? "下载" : "Download"}
              aria-label={isZh ? "下载" : "Download"}
              href={
                isZh
                  ? `${FB_SITE}/zh/download/success${DOWNLOAD_QUERY}&download_link_text=${encodeURIComponent("下载")}`
                  : `${FB_SITE}/download/success${DOWNLOAD_QUERY}&download_link_text=Download`
              }
            >
              {isZh ? "下载" : "Download"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
