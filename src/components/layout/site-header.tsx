"use client";

import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getLocaleFromPathname } from "@/lib/locale-path";

const FB_SITE = "https://floatboat.ai";

const NAV_LINKS = [
  { label: "Pricing", href: `${FB_SITE}/pricing` },
  { label: "About", href: `${FB_SITE}/about` },
];

const NAV_ZH: Record<string, string> = {
  Pricing: "价格",
  About: "关于",
  Download: "下载",
};

/**
 * Mirrors the official floatboat.ai header chrome: warm translucent blur bar,
 * logo → home, centered Product links, yellow Download pill on the right.
 * A minimal EN/中文 switcher is kept for the bilingual blog.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const isZh = locale === "zh";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-[rgba(240,238,235,0.8)] backdrop-blur-[16px]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <div className="flex h-[76px] items-center gap-5">
          <a
            href={FB_SITE}
            className="inline-flex flex-1 items-center"
            aria-label="floatboat"
            title="floatboat"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/floatboat-logo.svg"
              alt="floatboat"
              width={126}
              height={36}
              className="h-8 w-auto"
            />
          </a>

          <nav
            aria-label="Primary"
            className="hidden shrink-0 items-center justify-center gap-6 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-sm font-medium text-[#7a7671] transition-colors hover:text-[#1b1a18]"
              >
                {isZh ? NAV_ZH[link.label] ?? link.label : link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <LanguageSwitcher size="sm" />
            <a
              href={`${FB_SITE}/download`}
              title="Download"
              aria-label="Download"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#f7d68b] px-[14px] text-sm font-medium text-[#1b1a18] transition-colors hover:bg-[#f3cf79]"
            >
              {isZh ? "下载" : "Download"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
