import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import review from "../src/data/skills/publisher-review.json";
import { PROJECTS, projectPath } from "../src/lib/projects/project-pages";
import { buildProjectMetadata, projectShareImagePath } from "../src/lib/projects/project-metadata";
import { getStoreCatalog } from "../src/lib/skills/skill-categories";
import { getPublisherProfile, publisherProfilePath } from "../src/lib/skills/publisher-profiles";
import { getPublisherCardCopy } from "../src/lib/skills/publisher-card-copy";
import { getRelatedPages } from "../src/lib/related-pages";
import { buildCombinedSitemapXml } from "../src/lib/sitemap";
import { pathForLocale } from "../src/lib/locale-path";
import { buildPublisherMetadata } from "../src/lib/skills/publisher-metadata";

const ingress = readFileSync("k8s/ingress-main.yaml", "utf8");
const sitemap = buildCombinedSitemapXml();
const paths = new Set<string>();
assert.equal(PROJECTS.length, 7);
assert.equal(PROJECTS.filter((project) => project.classification === "official-harness").length, 4);

for (const project of PROJECTS) {
  const publisher = getPublisherProfile(project.author)!;
  const approval = review.publishers[project.author as keyof typeof review.publishers];
  assert.equal(approval.status, "approved");
  assert.equal(`https://github.com/${approval.representativeRepository}`, project.repository);
  assert(existsSync(`public${publisher.logo}`), `${project.author}: missing publisher avatar`);
  assert(existsSync(`public${projectShareImagePath(project.author, project.slug)}`), `${project.name}: missing share image`);
  getPublisherCardCopy(project.author);
  for (const locale of ["en", "zh"] as const) {
    const path = projectPath(locale, project.author, project.slug);
    assert(!paths.has(path), `Duplicate project path: ${path}`);
    paths.add(path);
    assert(!path.includes("/projects/"));
    assert(sitemap.includes(`<loc>https://floatboat.ai${path}</loc>`));
    const catalog = getStoreCatalog(locale);
    const entry = catalog.find((item) => item.entryType === "project" && item.authorHandle === project.author && item.sourceUrl === project.repository);
    assert.equal(entry?.href, path, `${project.name}: project card must open the local page`);
    assert.equal(entry.publisherHref, publisherProfilePath(locale, project.author));
    assert.equal(entry.hasLocalGuide, false, "Project pages must not inflate the Skill guide count");
    const metadata = buildProjectMetadata(project, locale);
    assert.equal(metadata.alternates?.canonical, `https://floatboat.ai${path}`);
    const publisherMetadata = buildPublisherMetadata(project.author, locale);
    assert.equal(publisherMetadata.alternates?.canonical, `https://floatboat.ai${publisherProfilePath(locale, project.author)}`);
    assert(publisherMetadata.openGraph?.images);
    assert.equal(pathForLocale(path, locale === "en" ? "zh" : "en"), projectPath(locale === "en" ? "zh" : "en", project.author, project.slug));
    const related = getRelatedPages("projects", `${project.author}/${project.slug}`, locale);
    assert.equal(related.items.length, 4);
    assert(!related.items.some((item) => item.href === path));
    for (const item of related.items) assert(sitemap.includes(`<loc>https://floatboat.ai${item.href}</loc>`));
    assert(project[locale].faq.every((faq) => faq.answer.length >= (locale === "en" ? 65 : 24)), `${project.name}: FAQ is too thin`);
    assert.equal(ingress.split(`          - path: ${locale === "zh" ? "/zh" : ""}/skills-marketplace\n            pathType: Prefix\n`).length - 1, 2, `${project.name}: both hosts must own the marketplace subtree`);
  }
}
assert.equal(paths.size, 14);
for (const locale of ["en", "zh"] as const) {
  assert(getStoreCatalog(locale).slice(0, PROJECTS.length).every((entry) => entry.entryType === "project" && entry.href.startsWith("/")), "The hub should feature the seven local project introductions first");
}
assert(!sitemap.includes("/skills-marketplace/moonshotai/kimi-cli</loc>"));
console.log(`Validated ${PROJECTS.length} independent projects, 14 localized detail paths, publisher links, metadata, related navigation, assets, and marketplace ingress.`);
