import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { resolveFeatures, validatePostFrontmatter, validateRequiredComponents, FAQ_HEADING } from "@openblog/core";
import { pathToFileURL } from "url";

import { CONTENT_DIR } from "../src/lib/content";

async function loadConfig() {
  const configPath = path.resolve(__dirname, "../openblog.config.ts");
  const mod = await import(pathToFileURL(configPath).href);
  return mod.default as import("@openblog/core").OpenBlogConfig;
}

function collectMarkdownFiles(contentDir: string): string[] {
  const files: string[] = [];
  const root = path.join(contentDir);
  if (!fs.existsSync(root)) return files;

  for (const entry of fs.readdirSync(root)) {
    const full = path.join(root, entry);
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

async function main() {
  const config = await loadConfig();
  const features = resolveFeatures(config);
  const unknownRequired = validateRequiredComponents(config);

  if (unknownRequired.length > 0) {
    console.error(
      `\n✗ Unknown components.required ids: ${unknownRequired.join(", ")}`,
    );
    process.exit(1);
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = collectMarkdownFiles(CONTENT_DIR);
  let failed = false;

  for (const filePath of files) {
    const rel = path.relative(CONTENT_DIR, filePath);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const slugFromFile = path.basename(filePath, ".md");

    // FAQ moved to src/data/faq-data.json (sidecar). Body FAQ is no longer rendered.
    if (FAQ_HEADING.test(content)) {
      console.warn(
        `⚠ ${rel}: FAQ section in body is deprecated — add items to src/data/faq-data.json ("/blog/<slug>" or "/zh/blog/<slug>") instead`,
      );
    }

    const result = validatePostFrontmatter(data, features);
    if (!result.success) {
      failed = true;
      console.error(`\n✗ ${rel}`);
      console.error(result.error.format());
      continue;
    }

    if (result.data.slug !== slugFromFile) {
      failed = true;
      console.error(
        `\n✗ ${rel}: slug "${result.data.slug}" vs filename "${slugFromFile}"`,
      );
      continue;
    }

    console.log(`✓ ${rel}`);
  }

  if (failed) {
    process.exit(1);
  }

  console.log(`\nValidated ${files.length} posts (en + zh).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
