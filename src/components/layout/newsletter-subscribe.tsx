"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { getLocaleFromPathname } from "@/lib/locale-path";
import type { NewsletterCopy } from "@/lib/newsletter-data";

/**
 * Newsletter sign-up card, mirroring the official floatboat.ai footer card.
 * All copy is injected via props; this component holds no hardcoded text
 * beyond the screen-reader-only field label (a11y scaffolding).
 */
export function NewsletterSubscribe({ copy }: { copy: NewsletterCopy }) {
  const [subscribed, setSubscribed] = useState(false);
  const isZh = getLocaleFromPathname(usePathname() ?? "/") === "zh";

  return (
    <div className="grid gap-6 rounded-[24px] border border-black/[0.08] bg-[var(--ob-color-surface)]/70 p-6 shadow-sm sm:p-8 md:grid-cols-2 md:items-center">
      <div>
        <h3 className="font-serif text-2xl leading-snug font-medium tracking-[-0.01em] text-[var(--ob-color-text)] sm:text-3xl">
          {copy.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ob-color-muted)]">
          {copy.description}
        </p>
      </div>
      {subscribed ? (
        <p className="text-sm leading-relaxed text-[var(--ob-color-muted)]">{copy.success}</p>
      ) : (
        <form
          className="flex w-full flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSubscribed(true);
          }}
        >
          <label className="sr-only" htmlFor="footer-newsletter-email">
            {isZh ? "邮箱地址" : "Email address"}
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            required
            placeholder={copy.placeholder}
            className="min-h-12 flex-1 rounded-full border border-[var(--ob-color-border-strong)] bg-[var(--ob-color-bg)] px-5 py-3 text-sm text-[var(--ob-color-text)] placeholder:text-[var(--ob-color-muted)]/60 focus:border-[var(--ob-color-text)]/30 focus:ring-2 focus:ring-[var(--ob-color-text)]/15 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ob-color-text)] px-6 py-3 text-sm font-medium text-[var(--ob-color-bg)] shadow-md transition hover:opacity-90"
          >
            {copy.buttonLabel}
          </button>
        </form>
      )}
    </div>
  );
}
