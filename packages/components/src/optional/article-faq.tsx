"use client";

import type { FaqItem } from "@openblog/core";
import { buildFaqSchema } from "@openblog/core";

import { JsonLd } from "../required/json-ld";
import { obBorder, obMuted, obText } from "../tokens";
import { cn } from "../utils";

const FAQ_TITLES = {
  en: "Frequently Asked Questions",
  zh: "常见问题",
} as const;

export function ArticleFaq({
  items,
  locale = "en",
}: {
  items: FaqItem[];
  locale?: "en" | "zh";
}) {
  if (!items.length) {
    return null;
  }

  const title = FAQ_TITLES[locale];

  return (
    <>
      <JsonLd data={buildFaqSchema(items, locale)} />
      <section className={cn("mt-16 border-t pt-12", obBorder)}>
        <h2 className={cn("mb-8 text-2xl font-semibold tracking-tight md:text-3xl", obText)}>
          {title}
        </h2>
        <div className={cn("divide-y", obBorder)}>
          {items.map((item, index) => (
            <details key={index} name="faq" className="group">
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center justify-between gap-3 py-5 text-left transition-colors hover:text-[var(--ob-color-accent)]",
                  obText,
                )}
              >
                <span className="min-w-0 flex-1 text-lg font-semibold leading-snug">
                  {item.question}
                </span>
                <svg
                  className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className={cn("pb-5 text-base leading-7 md:text-lg", obMuted)}>
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
