/**
 * One-shot migration: move per-article FAQ sections from markdown bodies
 * into src/data/faq-data.json (the sidecar storage ArticleLayout already
 * prefers via resolveFaqForPost).
 *
 * - Parsing uses the engine's own splitArticleContent + FAQ_HEADING, so the
 *   JSON data is byte-identical to what used to be parsed at render time.
 * - Bodies are rewritten with a minimal cut (heading → next `## ` / EOF);
 *   everything else stays byte-identical.
 * - Existing faq-data.json entries (e.g. /blog index) are preserved.
 *
 * Usage: npx tsx scripts/migrate-faq-to-json.ts
 */
import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { FAQ_HEADING, splitArticleContent } from "@openblog/core";

import { CONTENT_DIR } from "../src/lib/content";

type FaqItem = { question: string; answer: string };

const FAQ_DATA_PATH = path.resolve(__dirname, "../src/data/faq-data.json");

function collectMarkdownFiles(contentDir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(contentDir)) {
    const full = path.join(contentDir, entry);
    if (entry.endsWith(".md") && fs.statSync(full).isFile()) {
      files.push(full);
    }
  }
  const zhDir = path.join(contentDir, "zh");
  if (fs.existsSync(zhDir)) {
    for (const entry of fs.readdirSync(zhDir)) {
      if (entry.endsWith(".md")) {
        files.push(path.join(zhDir, entry));
      }
    }
  }
  return files;
}

/** Remove the FAQ section (heading → next `## ` / EOF), preserving all other bytes. */
function stripFaqSection(raw: string, contentOffset: number): string {
  const content = raw.slice(contentOffset);
  const match = FAQ_HEADING.exec(content);
  if (!match || match.index === undefined) {
    return raw;
  }
  const rest = content.slice(match.index);
  const nextHeading = rest.indexOf("\n## ", 1);
  const cut = nextHeading === -1 ? rest.length : nextHeading + 1;
  return raw.slice(0, contentOffset + match.index) + rest.slice(cut);
}

function main() {
  const files = collectMarkdownFiles(CONTENT_DIR);
  const existing = JSON.parse(fs.readFileSync(FAQ_DATA_PATH, "utf8")) as {
    pages: Record<string, { items: FaqItem[] }>;
  };

  const entries: Record<string, { items: FaqItem[] }> = {};
  let totalItems = 0;
  const noFaq: string[] = [];

  for (const filePath of files) {
    const rel = path.relative(CONTENT_DIR, filePath).split(path.sep).join("/");
    const slug = path.basename(filePath, ".md");
    const isZh = rel.startsWith("zh/");
    const routeKey = `${isZh ? "/zh/blog" : "/blog"}/${slug}`;

    const raw = fs.readFileSync(filePath, "utf8");
    const { content } = matter(raw);
    const contentOffset = raw.indexOf(content);

    const { faq } = splitArticleContent(content);
    if (faq.length === 0) {
      noFaq.push(rel);
      continue;
    }

    entries[routeKey] = { items: faq };
    totalItems += faq.length;

    const stripped = stripFaqSection(raw, contentOffset);

    // Self-check before writing: the rewritten body must parse to zero FAQ.
    const reparsed = splitArticleContent(matter(stripped).content);
    if (reparsed.faq.length !== 0) {
      console.error(`✗ ${rel}: FAQ still parseable after strip, aborting`);
      process.exit(1);
    }
    fs.writeFileSync(filePath, stripped);
  }

  const merged = {
    pages: Object.fromEntries(
      Object.entries({ ...existing.pages, ...entries }).sort(([a], [b]) =>
        a.localeCompare(b),
      ),
    ),
  };
  fs.writeFileSync(FAQ_DATA_PATH, JSON.stringify(merged, null, 2) + "\n");

  const enCount = Object.keys(entries).filter((k) => !k.startsWith("/zh/")).length;
  const zhCount = Object.keys(entries).filter((k) => k.startsWith("/zh/")).length;
  console.log(`✓ Migrated ${Object.keys(entries).length} routes (${enCount} en / ${zhCount} zh), ${totalItems} FAQ items`);
  console.log(`✓ faq-data.json now has ${Object.keys(merged.pages).length} route keys`);
  if (noFaq.length > 0) {
    console.warn(`⚠ ${noFaq.length} files had no FAQ section (left untouched):`);
    for (const rel of noFaq) console.warn(`  - ${rel}`);
  }
}

main();
