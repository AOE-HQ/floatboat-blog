"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { BlogLocale } from "@/config/i18n";
import { LOCALE_LABELS, SUPPORTED_LOCALES } from "@/config/i18n";
import {
  getLocaleFromPathname,
  pathForLocale,
} from "@/lib/locale-path";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  size?: "sm" | "md";
};

const SHORT_LABELS: Record<BlogLocale, string> = {
  en: "EN",
  zh: "中文",
};

/**
 * EN ↔ 中文 switcher with real hrefs (SEO-friendly), mirroring Alignify.
 */
export function LanguageSwitcher({
  className,
  size = "sm",
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);

  const linkBase = cn(
    "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ob-color-accent)]",
    size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs",
  );

  return (
    <nav
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-[var(--ob-color-border)] bg-[var(--ob-color-surface)] text-[var(--ob-color-muted)]",
        size === "sm" ? "p-0.5" : "p-1",
        className,
      )}
      aria-label={locale === "zh" ? "切换语言" : "Switch language"}
    >
      {SUPPORTED_LOCALES.map((target, index) => {
        const href = pathForLocale(pathname, target);
        const isActive = locale === target;

        return (
          <span key={target} className="inline-flex items-center gap-0.5">
            {index > 0 ? (
              <span className="select-none text-[var(--ob-color-border)]" aria-hidden>
                |
              </span>
            ) : null}
            <Link
              href={href}
              hrefLang={target}
              className={cn(
                linkBase,
                isActive
                  ? "bg-[var(--ob-color-bg)] font-medium text-[var(--ob-color-text)]"
                  : "hover:bg-[var(--ob-color-bg)] hover:text-[var(--ob-color-text)]",
              )}
              aria-current={isActive ? "page" : undefined}
              title={LOCALE_LABELS[target]}
            >
              {SHORT_LABELS[target]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
