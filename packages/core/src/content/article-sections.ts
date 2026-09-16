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

/** Heading that opens a FAQ block. Exported for the body→JSON migration tooling. */
export const FAQ_HEADING =
  /^##\s+(Frequently asked questions|FAQ|FAQs|常见问题)\s*$/im;

const SHARE_TRAILER =
  /\nShare\s*\n[\s\S]*?(?=\n##\s+(?:Frequently asked questions|FAQ|FAQs|常见问题)\s*\n)/i;

const FINAL_CTA_LINK =
  /\[(Book demo|预约演示[^\]]*)\]\(<(mailto:[^>]+)>\)/i;

/** Remove CMS-exported inline share block before FAQ. */
function stripShareTrailer(text: string): string {
  return text.replace(SHARE_TRAILER, "\n\n").trim();
}

/**
 * Floatboat/HTML-export FAQ bodies use one of two question shapes:
 *   ### A question?            (heading style — the answer may start on the
 *                              next line of the same block, no blank line)
 *   **A question?**            (bold lead block style)
 * Answers are plain blocks until the next question. Blockquote/other
 * formatting inside an answer is preserved as markdown.
 */
const H3_QUESTION = /^###\s+(.+)$/;
const BOLD_QUESTION = /^\*\*(.+)\*\*$/;

function parseFaqItems(raw: string): FaqItem[] {
  // Normalize CRLF (git autocrlf on Windows) so block splitting works.
  const normalized = raw.replace(/\r\n?/g, "\n");
  const blocks = normalized
    .trim()
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const items: FaqItem[] = [];
  let current: { question: string; answers: string[] } | null = null;

  const flush = () => {
    if (current && current.answers.length > 0) {
      items.push({
        question: current.question,
        answer: current.answers.join("\n\n"),
      });
    }
    current = null;
  };

  for (const block of blocks) {
    // A `### question` may share its block with the answer (no blank line
    // after the heading), so test the block's FIRST LINE, not the whole block.
    const newlineAt = block.indexOf("\n");
    const firstLine = newlineAt === -1 ? block : block.slice(0, newlineAt);
    const h3 = firstLine.match(H3_QUESTION);
    const bold = block.match(BOLD_QUESTION);
    if (h3 || bold) {
      flush();
      current = {
        question: (h3 ? h3[1] : bold![1]).trim(),
        answers: h3 && newlineAt !== -1 ? [block.slice(newlineAt + 1).trim()] : [],
      };
      continue;
    }
    if (current) {
      current.answers.push(block);
    } else if (items.length === 0) {
      // tolerate leading prose before the first recognized question
      current = null;
    }
  }
  flush();

  // Fallback: older pattern with alternating question/answer plain blocks.
  if (items.length === 0 && blocks.length >= 2) {
    for (let i = 0; i < blocks.length - 1; i += 2) {
      const question = blocks[i];
      const answer = blocks[i + 1];
      if (question && answer) {
        items.push({ question, answer });
      }
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
 * Split markdown body from trailing FAQ + final CTA blocks
 * (Lucius CMS "## heading + [Book demo](mailto:…)" pattern and Floatboat
 * product-CTA paragraphs, both of which may follow an FAQ block).
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
