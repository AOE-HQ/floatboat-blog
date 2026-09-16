#!/usr/bin/env node
/**
 * Convert raster blog images under public/blog/images to WebP and rewrite
 * Markdown references. SVG is left alone.
 *
 *   node scripts/convert-blog-images-to-webp.mjs
 *   node scripts/convert-blog-images-to-webp.mjs --check
 */
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGE_DIR = path.join(ROOT, "public/blog/images");
const CONTENT_DIR = path.join(ROOT, "content");
const RASTER = new Set([".png", ".jpg", ".jpeg"]);
const QUALITY = 80;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function webpPath(file) {
  return file.replace(/\.(png|jpe?g)$/i, ".webp");
}

async function convertFile(file) {
  const sharp = (await import("sharp")).default;
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext)) return { skipped: true, file };
  const dest = webpPath(file);
  await sharp(file).rotate().webp({ quality: QUALITY }).toFile(dest);
  if (path.resolve(dest) !== path.resolve(file)) {
    await unlink(file);
  }
  return { skipped: false, file, dest };
}

async function collectMarkdownHits() {
  const files = (await walk(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  const pattern = /\/blog\/images\/([^)\s"'<>]+)\.(png|jpe?g)/gi;
  const hits = [];
  for (const file of files) {
    const text = await readFile(file, "utf8");
    for (const match of text.match(pattern) || []) {
      hits.push(`${path.relative(ROOT, file)}: ${match}`);
    }
  }
  return hits;
}

async function check() {
  const images = await walk(IMAGE_DIR);
  const rasters = images.filter((file) =>
    RASTER.has(path.extname(file).toLowerCase()),
  );
  const mdHits = await collectMarkdownHits();
  if (rasters.length === 0 && mdHits.length === 0) {
    console.log("ok: blog images are WebP");
    return;
  }
  if (rasters.length) {
    console.error(`found ${rasters.length} png/jpeg files under public/blog/images:`);
    for (const file of rasters.slice(0, 20)) {
      console.error(`  ${path.relative(ROOT, file)}`);
    }
    if (rasters.length > 20) console.error(`  ... ${rasters.length - 20} more`);
  }
  if (mdHits.length) {
    console.error(`found ${mdHits.length} Markdown refs still pointing at png/jpeg:`);
    for (const hit of mdHits.slice(0, 20)) console.error(`  ${hit}`);
    if (mdHits.length > 20) console.error(`  ... ${mdHits.length - 20} more`);
  }
  console.error("run: npm run images:webp");
  process.exit(1);
}

async function rewriteMarkdown() {
  const files = (await walk(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  const pattern = /\/blog\/images\/([^)\s"'<>]+)\.(png|jpe?g)/gi;
  let filesChanged = 0;
  let replacements = 0;
  for (const file of files) {
    const before = await readFile(file, "utf8");
    const hits = before.match(pattern) || [];
    const after = before.replace(pattern, "/blog/images/$1.webp");
    if (after !== before) {
      await writeFile(file, after);
      filesChanged += 1;
      replacements += hits.length;
    }
  }
  return { filesChanged, replacements };
}

if (process.argv.includes("--check")) {
  await check();
  process.exit(0);
}

const images = await walk(IMAGE_DIR);
let converted = 0;
let bytesIn = 0;
let bytesOut = 0;
const { statSync } = await import("node:fs");
for (const file of images) {
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext)) continue;
  const before = statSync(file).size;
  const result = await convertFile(file);
  if (result.skipped) continue;
  const after = statSync(result.dest).size;
  converted += 1;
  bytesIn += before;
  bytesOut += after;
}

const md = await rewriteMarkdown();
const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(
  `converted ${converted} images  ${mb(bytesIn)} -> ${mb(bytesOut)}`,
);
console.log(
  `rewrote ${md.replacements} markdown refs in ${md.filesChanged} files`,
);
