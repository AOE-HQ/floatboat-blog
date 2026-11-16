/** Validate recorded independent review gates; never awards editorial approval. */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { createHash } from "node:crypto";
import matter from "gray-matter";

const args = process.argv.slice(2);
const value = (name) => {
  const index = args.indexOf(name);
  const result = index < 0 ? undefined : args[index + 1];
  if (!result || result.startsWith("--")) throw new Error(`Missing value for ${name}`);
  return result;
};
const registryPath = value("--registry");
const variant = value("--variant");
const phase = value("--phase");
if (!args.includes("--registry") || !args.includes("--variant") || !["brief", "integrate"].includes(phase)) {
  throw new Error("Usage: node scripts/check-cover-batch.mjs --registry <file> --variant <batch> --phase brief|integrate");
}
const { entries, batches } = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const manifest = batches?.[variant];
if (!manifest?.slugs?.length || !manifest.locales?.length) throw new Error(`Missing fixed batch manifest for ${variant}`);
const digest = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const scope = { slugs: [...manifest.slugs].sort(), locales: [...manifest.locales].sort(), copyVersion: manifest.copyVersion };
if (manifest.scopeSha256 !== digest(scope)) throw new Error("Batch scope changed after review");
const batch = entries.filter(entry => entry.variant === variant);
if (!batch.length) throw new Error(`No entries for ${variant}`);
const keys = new Set();
const pairs = new Map();
for (const entry of batch) {
  const key = `${entry.slug}/${entry.locale}`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) throw new Error(`Invalid slug: ${key}`);
  if (keys.has(key)) throw new Error(`Duplicate entry: ${key}`);
  keys.add(key);
  const pair = pairs.get(entry.slug) ?? new Set();
  pair.add(entry.locale);
  pairs.set(entry.slug, pair);
  if (!["en", "zh"].includes(entry.locale)) throw new Error(`Invalid locale: ${key}`);
  for (const field of ["headline", "subtitle", "sourceTitle", "sourceDescription", "copyVersion"]) {
    if (!entry[field]?.trim()) throw new Error(`Missing ${field}: ${key}`);
  }
  if (!Array.isArray(entry.sceneLabels) || entry.sceneLabels.length < 2 || entry.sceneLabels.some(label => !label.trim())) {
    throw new Error(`Missing meaningful scene-label brief: ${key}`);
  }
  if (entry.briefReview?.verdict !== "PUBLISH_READY" || !entry.briefReview.reviewer || entry.briefReview.copyVersion !== entry.copyVersion) {
    throw new Error(`Independent brief review missing, failed, or stale: ${key}`);
  }
  if (entry.copyVersion !== manifest.copyVersion) throw new Error(`Copy version diverges from batch: ${key}`);
  const source = path.resolve("content/blog", entry.locale === "zh" ? "zh" : "", `${entry.slug}.md`);
  const parsed = matter(fs.readFileSync(source, "utf8"));
  const sourceHash = digest({ title: parsed.data.title, description: parsed.data.description, body: parsed.content });
  if (entry.sourceContentSha256 !== sourceHash) throw new Error(`Article source changed after review: ${key}`);
  const briefHash = digest({ slug: entry.slug, locale: entry.locale, copyVersion: entry.copyVersion, headline: entry.headline, subtitle: entry.subtitle, sceneLabels: entry.sceneLabels, composition: entry.composition, sourceTitle: entry.sourceTitle, sourceDescription: entry.sourceDescription, sourceContentSha256: entry.sourceContentSha256 });
  if (entry.briefReview.briefSha256 !== briefHash) throw new Error(`Brief content changed after independent review: ${key}`);
  if (phase === "integrate") {
    if (entry.imageReview?.verdict !== "PUBLISH_READY" || !entry.imageReview.reviewer || entry.imageReview.copyVersion !== entry.copyVersion || entry.imageReview.output !== entry.output || entry.imageReview.briefSha256 !== entry.briefReview.briefSha256) {
      throw new Error(`Independent final-image review missing, failed, or stale: ${key}`);
    }
    if (!entry.output?.startsWith(`/blog/images/${entry.slug}/`) || !entry.output.endsWith(".webp")) throw new Error(`Invalid output: ${key}`);
    const image = path.resolve("public", `.${entry.output}`);
    const folder = path.resolve("public/blog/images", entry.slug) + path.sep;
    if (!image.startsWith(folder)) throw new Error(`Output escaped article image folder: ${key}`);
    const hash = createHash("sha256").update(fs.readFileSync(image)).digest("hex");
    if (entry.imageReview.sha256 !== hash) throw new Error(`Final-image pixels changed after independent review: ${key}`);
    const metadata = await sharp(image).metadata();
    if (metadata.width !== 1200 || metadata.height !== 630 || metadata.format !== "webp") throw new Error(`Wrong image format/size: ${key}`);
  }
}
for (const [slug, locales] of pairs) {
  if (!locales.has("en") || !locales.has("zh")) throw new Error(`Incomplete bilingual pair: ${slug}`);
}
const expected = new Set(manifest.slugs.flatMap(slug => manifest.locales.map(locale => `${slug}/${locale}`)));
if (expected.size !== keys.size || [...expected].some(key => !keys.has(key))) throw new Error("Batch missing or adding articles/locales relative to fixed manifest");
console.log(`OK: ${batch.length} localized entries / ${pairs.size} articles passed the recorded ${phase} gate. Editorial approval comes from the named independent reviewer, not this script.`);
