import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getCatalogInventory, getStoreCatalog, getCategoryResources, SKILL_CATEGORY_SLUGS } from "../src/lib/skills/skill-categories";
import { getResourceLabels, projectResourceId, RESOURCE_TAXONOMY_IDS } from "../src/lib/skills/resource-taxonomy";
import { buildCombinedSitemapXml } from "../src/lib/sitemap";

const paths = new Set([...buildCombinedSitemapXml().matchAll(/<loc>https:\/\/floatboat.ai([^<]*)<\/loc>/g)].map((match) => match[1]));
const en = getStoreCatalog("en");
const zh = getStoreCatalog("zh");
assert.equal(new Set(en.map((entry) => entry.id)).size, en.length, "Duplicate resource identities");
assert.deepEqual(en.map((entry) => entry.id), zh.map((entry) => entry.id), "Locale resource sets differ");
assert.deepEqual([...RESOURCE_TAXONOMY_IDS].sort(), getCatalogInventory("en").map((entry) => entry.id).sort(), "Missing or orphan taxonomy records");
for (const locale of ["en", "zh"] as const) {
  const entries = getStoreCatalog(locale);
  assert.equal(new Set(entries.map((entry) => entry.href)).size, entries.length, "Duplicate directory destinations");
  for (const entry of entries) {
    assert(entry.entryType !== "skill" || entry.hasLocalGuide, `Unguided Skill in the directory: ${entry.id}`);
    assert(entry.categories.length && entry.taxonomy.tags.length, `Unclassified resource: ${entry.id}`);
    assert(entry.taxonomy.categories.every((category) => paths.has(category.href)), `Missing category route: ${entry.id}`);
    assert(entry.taxonomy.tags.every((tag) => !("href" in tag)), `Tag destination must not exist: ${entry.id}`);
    if (entry.href.startsWith("/")) assert(paths.has(entry.href), `Missing resource route: ${entry.href}`);
    assert(!entry.href.includes("?type=") && !entry.href.includes("?tag="));
    assert(!["Conversion Factory", "SwipeFiles"].includes(entry.name), "Services must remain publisher background links");
  }
  for (const slug of SKILL_CATEGORY_SLUGS) {
    const listed = getCategoryResources(slug, locale);
    assert.deepEqual(listed.map((entry) => entry.id), entries.filter((entry) => entry.categories.includes(slug)).map((entry) => entry.id));
  }
  const react = getResourceLabels("vercel-labs/vercel-react-best-practices", locale);
  assert(react.some((label) => label.id === "coding" && label.href?.endsWith("/categories/coding")));
  assert.deepEqual(react.filter((label) => !label.href).map((label) => label.id), ["react", "nextjs", "performance", "code-review"]);
  const imprint = entries.find((entry) => entry.id === projectResourceId("https://github.com/pbakaus/impeccable"))!;
  assert.equal(imprint.href, `${locale === "zh" ? "/zh" : ""}/skills-marketplace/pbakaus/impeccable`, "Paired software must reuse its existing canonical guide");
}
assert.equal(projectResourceId("https://github.com/OpenAI/Codex.git/"), projectResourceId("https://github.com/openai/codex"));
const source = readFileSync("src/components/marketing/directory-tabs.tsx", "utf8");
assert(!/useSearchParams|pushState|replaceState|window\.location/.test(source), "Directory filters must remain local state");
const raw = JSON.parse(readFileSync("src/data/skills/categories.json", "utf8"));
assert(Object.values(raw).every((entry) => !("skills" in (entry as object))), "Reverse membership must not be duplicated");
console.log(`OK: ${en.length} resources (${en.filter((entry) => entry.entryType === "project").length} projects, ${en.filter((entry) => entry.entryType === "skill").length} Skills), ${SKILL_CATEGORY_SLUGS.length} categories, bilingual links and tag boundaries`);
