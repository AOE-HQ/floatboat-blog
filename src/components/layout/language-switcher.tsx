"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getLocaleFromPathname, pathForLocale } from "@/lib/locale-path";

/**
 * Language control styled as the icon button on floatboat.ai (single 18px
 * "languages" glyph, size-9 hit area) but kept functional for the bilingual
 * blog: it links straight to the same page in the other locale (real href,
 * hrefLang-tagged, SEO-friendly) instead of opening a dropdown.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const target = locale === "zh" ? "en" : "zh";

  return (
    <Link
      href={pathForLocale(pathname, target)}
      hrefLang={target}
      aria-label={locale === "zh" ? "Switch to English" : "切换至中文"}
      title={locale === "zh" ? "Switch to English" : "切换至中文"}
      className="inline-flex size-9 items-center justify-center rounded-md p-0 text-[#1b1a18] transition-colors hover:bg-black/[0.05]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
    </Link>
  );
}
