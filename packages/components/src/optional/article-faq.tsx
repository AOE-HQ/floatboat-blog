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

/**
 * Answers come from article markdown, so inline `**bold**`, `` `code` ``, and
 * `<https://url>` autolinks must be rendered; the FAQPage JSON-LD needs the
 * same answers as plain text. Input is HTML-escaped first, so only the
 * constructs matched below can ever produce tags.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInlineMarkdown(text: string): string {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/&lt;(https?:\/\/[^&\s<>]+)&gt;/gi, (_match, url: string) => {
      const href = url.replace(/&amp;/g, "&");
      return `<a href="${href}" target="_blank" rel="noopener nofollow">${href}</a>`;
    });
}

function faqAnswerPlainText(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<(https?:\/\/[^&\s<>]+)>/gi, "$1");
}

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
      <JsonLd
        data={buildFaqSchema(
          items.map((item) => ({
            question: item.question,
            answer: faqAnswerPlainText(item.answer),
          })),
          locale,
        )}
      />
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
              <div
                className={cn("pb-5 text-base leading-7 md:text-lg", obMuted)}
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item.answer) }}
              />
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
