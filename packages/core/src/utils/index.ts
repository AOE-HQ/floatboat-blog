import { resolveDisplayImageUrl } from "./post-image";

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getPostExcerpt(description: string, maxLength = 140): string {
  const text = description.trim().replace(/\s+/g, " ");
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const base = lastSpace > 60 ? truncated.slice(0, lastSpace) : truncated;
  return `${base.trim()}…`;
}

export function getReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function stripDuplicateH1(content: string, title: string): string {
  const lines = content.split("\n");
  if (!lines[0]?.startsWith("# ")) {
    return content;
  }

  const h1 = lines[0].slice(2).trim();
  const normalize = (value: string) => value.replace(/\?$/, "").trim();

  if (normalize(h1) === normalize(title)) {
    return lines.slice(1).join("\n").trimStart();
  }

  return content;
}

export function extractCoverImage(content: string): string | undefined {
  const markdownImage = content.match(/!\[[^\]]*]\(([^)]+)\)/);
  if (markdownImage?.[1]) {
    return markdownImage[1];
  }

  const htmlImage = content.match(/<img[^>]+src="([^"]+)"/i);
  return htmlImage?.[1] ?? undefined;
}

export function extractLeadParagraph(content: string): string | null {
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (
      !trimmed ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("!") ||
      trimmed.startsWith("<") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("-")
    ) {
      continue;
    }

    return trimmed;
  }

  return null;
}

export function extractToc(
  content: string,
): { id: string; title: string; level: number }[] {
  const items: { id: string; title: string; level: number }[] = [];

  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const level = match[1].length;
    const { title, id } = parseHeadingAnchor(match[2]);

    items.push({ id, title, level });
  }

  return items;
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const HEADING_ANCHOR_SUFFIX = /\s*\{#([a-z0-9-]+)\}\s*$/i;

/**
 * Reverse CommonMark backslash escapes in a heading's display text.
 * Exporters (html2text) escape e.g. `1.` as `1\.` so it is not parsed as an
 * ordered list; a raw-line TOC extractor would otherwise show the backslash.
 */
function unescapeMarkdownTitle(title: string): string {
  return title.replace(/\\([\\`*_[\]{}()#+\-.!|>~])/g, "$1");
}

/** Split `## Title {#custom-id}` into display title and anchor id. */
export function parseHeadingAnchor(value: string): { title: string; id: string } {
  const trimmed = value.trim();
  const match = HEADING_ANCHOR_SUFFIX.exec(trimmed);
  if (match) {
    return {
      title: unescapeMarkdownTitle(trimmed.slice(0, match.index).trim()),
      id: match[1].toLowerCase(),
    };
  }

  return { title: unescapeMarkdownTitle(trimmed), id: slugifyHeading(trimmed) };
}

/** Resolve post image to absolute URL for OG / JSON-LD (same asset as hero FeaturedImage). */
export function resolvePostImageUrl(
  imageUrl: string | undefined,
  absoluteUrl: (path: string) => string,
): string | undefined {
  const displayPath = resolveDisplayImageUrl(imageUrl);
  if (!displayPath) {
    return undefined;
  }

  if (
    displayPath.startsWith("http://") ||
    displayPath.startsWith("https://")
  ) {
    return displayPath;
  }

  const path = displayPath.startsWith("/") ? displayPath : `/${displayPath}`;
  return absoluteUrl(path);
}

export { resolveDisplayImageUrl } from "./post-image";

export {
  extractTldrFromContent,
  stripTldrFromContent,
  tldrToPlainText,
  type TldrContent,
} from "../content/tldr";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
