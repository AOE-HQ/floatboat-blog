import type { FaqItem } from "@openblog/core";
import { buildFaqSchema } from "@openblog/core";
import { JsonLd } from "@openblog/components";

const FAQ_TITLES = {
  en: "Frequently Asked Questions",
  zh: "常见问题",
} as const;

/**
 * FAQ answers come from src/data/faq-data.json and may contain inline
 * markdown (`**bold**`, `` `code` ``, `<https://url>` autolinks, and
 * `[text](url)` links — some with junk hrefs like `</>`, which must degrade
 * to plain text). Input is HTML-escaped first, so only the constructs
 * matched below can produce tags.
 */
const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const AUTOLINK = /&lt;(https?:\/\/[^&\s<>]+)&gt;/gi;

function isHttpUrl(candidate: string): boolean {
  return /^https?:\/\/[^\s<>]+$/.test(candidate);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function anchor(href: string, label: string): string {
  return `<a href="${href}" target="_blank" rel="noopener nofollow">${label}</a>`;
}

function renderInlineMarkdown(text: string): string {
  let escaped = escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
  escaped = escaped.replace(MARKDOWN_LINK, (_match, label: string, href: string) => {
    // href may be wrapped in angle brackets (&lt;…&gt; after escaping).
    const decoded = href
      .replace(/^&lt;/, "")
      .replace(/&gt;$/, "")
      .replace(/&amp;/g, "&");
    return isHttpUrl(decoded) ? anchor(decoded, label) : label;
  });
  return escaped.replace(AUTOLINK, (_match, url: string) => {
    const href = url.replace(/&amp;/g, "&");
    return anchor(href, href);
  });
}

/** Plain-text version of an answer for the FAQPage JSON-LD. */
function faqAnswerPlainText(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(MARKDOWN_LINK, (_match, label: string, href: string) => {
      const decoded = href.replace(/^</, "").replace(/>$/, "");
      return isHttpUrl(decoded) ? `${label} (${decoded})` : label;
    })
    .replace(/<(https?:\/\/[^&\s<>]+)>/gi, "$1");
}

/**
 * Full-width FAQ band rendered by the article pages (en + zh). Unlike the
 * old in-column ArticleFaq, this section spans the full site band
 * (max-w-[1440px], same as header/footer) with a centered reading column.
 */
export function FaqBand({
  items,
  locale,
}: {
  items: FaqItem[];
  locale: "en" | "zh";
}) {
  if (items.length === 0) {
    return null;
  }

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
      <section className="w-full border-t border-[var(--ob-color-border)] py-14 md:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-[var(--ob-color-text)] md:text-3xl">
              {FAQ_TITLES[locale]}
            </h2>
            <div className="divide-y divide-[var(--ob-color-border)]">
              {items.map((item, index) => (
                <details key={index} name="faq" className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-5 text-left text-[var(--ob-color-text)] transition-colors hover:text-[var(--ob-color-accent)]">
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
                    className="pb-5 text-base leading-7 text-[var(--ob-color-muted)] md:text-lg"
                    dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item.answer) }}
                  />
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
