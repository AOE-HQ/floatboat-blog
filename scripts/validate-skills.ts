import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import mergedSkills from "../src/data/skills/merged-skills.json";
import { skillShareImagePath } from "../src/lib/skills/skill-metadata";
import { FEATURED_SKILLS, skillPath } from "../src/lib/skills/featured-skills";
import { getPublisherProfile, PUBLISHER_PROFILE_HANDLES } from "../src/lib/skills/publisher-profiles";
import { getSkillCatalog } from "../src/lib/skills/skill-categories";
import { getRelatedPages } from "../src/lib/related-pages";

// Data schemas validate bilingual completeness; these checks cover cross-page integration.
const catalog = getSkillCatalog("en");
const ingress = readFileSync(new URL("../k8s/ingress-main.yaml", import.meta.url), "utf8");
for (const skill of FEATURED_SKILLS) {
  const id = `${skill.authorHandle}/${skill.slug}`;
  const publisher = getPublisherProfile(skill.authorHandle);
  assert(publisher, `${id}: publisher page is missing`);
  assert.equal(skill.publisherType, publisher.type, `${id}: publisher type mismatch`);
  const entry = catalog.find((item) => item.id === id);
  assert(entry?.categories.length, `${id}: guide has no work-area category`);
  assert(entry?.hasLocalGuide, `${id}: catalog does not open its local guide`);
  assert.equal(entry.href, skillPath("en", skill.authorHandle, skill.slug));
  for (const locale of ["en", "zh"] as const) {
    const related = getRelatedPages("skills", id, locale);
    assert.equal(related.items.length, 4);
    assert.equal(new Set(related.items.map((item) => item.href)).size, 4);
    assert(!related.items.some((item) => item.href === skillPath(locale, skill.authorHandle, skill.slug)), `${id}: related link points to itself`);
    assert(skill.seo.title[locale].includes(skill.name), `${id}: metadata omits the Skill name`);
    assert(skill.hero.title[locale].includes(skill.name), `${id}: hero omits the Skill name`);
    assert.equal(skill.overview[locale].paragraphs.length, 1);
    assert(skill.faq.every((item) => item.answer[locale].length >= (locale === "en" ? 55 : 20)), `${id}: FAQ answers need substantive page-specific content`);
  }
  assert(existsSync(`public${skillShareImagePath(skill.authorHandle, skill.slug)}`), `${id}: missing share image`);
  if (!skill.installation?.commands) {
    assert(/^npx skills add\s+/.test(skill.upstreamInstall), `${id}: generic installation must use Skills CLI`);
  }
  if (skill.installation?.commands) {
    assert(skill.installation.supportedAgents?.length, `${id}: native setup needs an explicit agent list`);
    for (const agent of skill.installation.supportedAgents) {
      assert(skill.installation.commands[agent], `${id}: no native instructions for ${agent}`);
    }
  }
  for (const prefix of ["", "/zh"]) {
    const marker = `          - path: ${prefix}/skills-marketplace\n            pathType: Prefix\n`;
    assert.equal(ingress.split(marker).length - 1, 2, `${id}: both host rules must route the marketplace subtree`);
  }
}
for (const [source, target] of Object.entries(mergedSkills)) {
  assert(!FEATURED_SKILLS.some((skill) => `${skill.authorHandle}/${skill.slug}` === source), `${source}: alias still has an independent page`);
  assert(FEATURED_SKILLS.some((skill) => `${skill.authorHandle}/${skill.slug}` === target), `${source}: merged guide is missing`);
  assert(!catalog.some((item) => item.id === source), `${source}: alias still has a directory card`);
}
for (const handle of PUBLISHER_PROFILE_HANDLES) {
  getRelatedPages("publishers", handle, "en");
  getRelatedPages("publishers", handle, "zh");
}
assert.equal(new Set(catalog.map((entry) => entry.id)).size, catalog.length);
console.log(`Validated ${FEATURED_SKILLS.length} bilingual Skill guides, ${PUBLISHER_PROFILE_HANDLES.length} publisher routes, catalog upgrades, related links, installation data, and ingress prefixes.`);
