export type FaqItem = {
  question: string;
  answer: string;
};

export type { FinalCta, FinalCtaInput } from "./final-cta";
export { normalizeFinalCta } from "./final-cta";

import { normalizeFinalCta, type FinalCta } from "./final-cta";

export type SplitArticleContent = {
  body: string;
  faq: FaqItem[];
  finalCta: FinalCta | null;
};

const FAQ_HEADING =
  /^##\s+(Frequently asked questions|常见问题)\s*$/im;

const SHARE_TRAILER =
  /\nShare\s*\n[\s\S]*?(?=\n##\s+(?:Frequently asked questions|常见问题)\s*\n)/i;

const FINAL_CTA_LINK =
  /\[(Book demo|预约演示[^\]]*)\]\(<(mailto:[^>]+)>\)/i;

/** Remove CMS-exported inline share block before FAQ. */
function stripShareTrailer(text: string): string {
  return text.replace(SHARE_TRAILER, "\n\n").trim();
}

function parseFaqItems(raw: string): FaqItem[] {
  const blocks = raw
    .trim()
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const items: FaqItem[] = [];
  for (let i = 0; i < blocks.length - 1; i += 2) {
    const question = blocks[i];
    const answer = blocks[i + 1];
    if (question && answer) {
      items.push({ question, answer });
    }
  }
  return items;
}

function parseFinalCtaSection(section: string): FinalCta | null {
  const linkMatch = section.match(FINAL_CTA_LINK);
  if (!linkMatch || linkMatch.index === undefined) {
    return null;
  }

  const headingMatch = section.match(/^##\s+(.+)$/m);
  if (!headingMatch) {
    return null;
  }

  const beforeLink = section.slice(0, linkMatch.index).trim();
  const bodyRaw = beforeLink.replace(/^##\s+.+\n+/, "").trim();
  const paragraphs = bodyRaw
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return normalizeFinalCta({
    title: headingMatch[1].trim(),
    paragraphs,
    buttonLabel: linkMatch[1].trim(),
    href: linkMatch[2].trim(),
  });
}

/**
 * Split markdown body from trailing FAQ + final CTA blocks (Lucius CMS export pattern).
 */
export function splitArticleContent(content: string): SplitArticleContent {
  const faqMatch = content.match(FAQ_HEADING);
  if (!faqMatch || faqMatch.index === undefined) {
    return {
      body: stripShareTrailer(content),
      faq: [],
      finalCta: extractStandaloneFinalCta(content),
    };
  }

  const body = stripShareTrailer(content.slice(0, faqMatch.index)).trim();
  const tail = content.slice(faqMatch.index + faqMatch[0].length);

  const finalHeadingIndex = findFinalCtaHeadingIndex(tail);
  if (finalHeadingIndex >= 0) {
    const faqRaw = tail.slice(0, finalHeadingIndex);
    const ctaSection = tail.slice(finalHeadingIndex);
    return {
      body,
      faq: parseFaqItems(faqRaw),
      finalCta: parseFinalCtaSection(ctaSection),
    };
  }

  return {
    body,
    faq: parseFaqItems(tail),
    finalCta: null,
  };
}

function findFinalCtaHeadingIndex(tail: string): number {
  const headings = [...tail.matchAll(/\n##\s+.+\n/g)];
  for (let i = headings.length - 1; i >= 0; i -= 1) {
    const match = headings[i];
    if (match.index === undefined) {
      continue;
    }
    const section = tail.slice(match.index);
    if (FINAL_CTA_LINK.test(section)) {
      return match.index;
    }
  }
  return -1;
}

function extractStandaloneFinalCta(content: string): FinalCta | null {
  const index = findFinalCtaHeadingIndex(content);
  if (index < 0) {
    return null;
  }
  return parseFinalCtaSection(content.slice(index));
}
