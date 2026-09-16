#!/usr/bin/env node
/**
 * Convert raster blog images under public/blog/images to WebP and rewrite
 * Markdown references. SVG is left alone.
 *
 *   node scripts/convert-blog-images-to-webp.mjs
 */
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

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
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext)) return { skipped: true, file };
  const dest = webpPath(file);
  await sharp(file).rotate().webp({ quality: QUALITY }).toFile(dest);
  if (path.resolve(dest) !== path.resolve(file)) {
    await unlink(file);
  }
  return { skipped: false, file, dest };
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
