import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Each scenario changes only an in-memory JSON module before application imports.
// No on-disk review decision or preview data is changed by these tests.
const scenario = String.raw`
const assert = require("node:assert/strict");
const held = JSON.parse(process.env.WITHDRAWN_PUBLISHERS);
const review = require("./src/data/skills/publisher-review.json");
for (const handle of held) {
  review.publishers[handle].status = "held";
}
const publishers = require("./src/lib/skills/publisher-profiles.ts");
const { ALL_FEATURED_SKILLS, FEATURED_SKILLS, getFeaturedSkill } = require("./src/lib/skills/featured-skills.ts");
const catalog = require("./src/lib/skills/skill-categories.ts");
const { getRelatedPages } = require("./src/lib/related-pages.ts");
const { buildCombinedSitemapXml } = require("./src/lib/sitemap.ts");
const { ALL_PROJECTS, PROJECTS, getProject } = require("./src/lib/projects/project-pages.ts");
const isWithdrawn = (url) => held.some((handle) => url.includes("/combostore/" + handle + "/") || url.endsWith("/combostore/" + handle));
for (const handle of held) {
  assert.equal(publishers.getPublisherProfile(handle), undefined);
  assert(!publishers.PUBLISHER_PROFILE_HANDLES.includes(handle));
}
assert(FEATURED_SKILLS.every((skill) => !held.includes(skill.authorHandle)));
assert(PROJECTS.every((project) => !held.includes(project.author)));
for (const project of ALL_PROJECTS.filter((project) => held.includes(project.author))) {
  assert.equal(getProject(project.author, project.slug), undefined);
}
for (const skill of ALL_FEATURED_SKILLS.filter((skill) => held.includes(skill.authorHandle))) {
  assert.equal(getFeaturedSkill(skill.authorHandle, skill.slug), undefined);
}
for (const locale of ["en", "zh"]) {
  assert(catalog.getStoreCatalog(locale).every((entry) => !held.includes(entry.authorHandle)));
  for (const slug of catalog.SKILL_CATEGORY_SLUGS) {
    assert(catalog.getCategorySkills(slug, locale).every((entry) => !isWithdrawn(entry.publisherHref) && !isWithdrawn(entry.href)));
  }
  for (const handle of publishers.PUBLISHER_PROFILE_HANDLES) {
    assert(getRelatedPages("publishers", handle, locale).items.every((entry) => !isWithdrawn(entry.href)));
  }
  for (const skill of FEATURED_SKILLS) {
    assert(getRelatedPages("skills", skill.authorHandle + "/" + skill.slug, locale).items.every((entry) => !isWithdrawn(entry.href)));
  }
  for (const project of PROJECTS) {
    assert(getRelatedPages("projects", project.author + "/" + project.slug, locale).items.every((entry) => !isWithdrawn(entry.href)));
  }
  const folder = locale === "en" ? "src/app/(en)/(marketing)/combostore" : "src/app/(zh)/zh/(marketing)/combostore";
  const detail = require("./" + folder + "/[author]/[slug]/page.tsx");
  assert(detail.generateStaticParams().every((entry) => !held.includes(entry.author)));
  for (const handle of ["vercel-labs", "morluto"].filter((handle) => held.includes(handle))) {
    const page = require("./" + folder + "/" + handle + "/page.tsx");
    assert.deepEqual(page.generateMetadata(), {});
    assert.throws(() => page.default(), /NEXT_HTTP_ERROR_FALLBACK;404/);
  }
}
const sitemap = buildCombinedSitemapXml();
for (const handle of held) {
  assert(!sitemap.includes("/combostore/" + handle + "</loc>"));
  assert(!sitemap.includes("/combostore/" + handle + "/"));
}
console.log("Passed withdrawal: " + held.join(", "));
`;

const root = fileURLToPath(new URL("../", import.meta.url));
const review = JSON.parse(readFileSync(new URL("../src/data/skills/publisher-review.json", import.meta.url), "utf8"));
const active = Object.entries(review.publishers).filter(([, entry]) => entry.status === "approved").map(([handle]) => handle);
const projectPublishers = ["openai", "deepseek-ai", "earendil-works", "anomalyco", "nousresearch", "moonshotai", "zai-org"];
for (const held of [["anthropics"], ["obra"], ["vercel-labs"], ["morluto"], ...projectPublishers.map((handle) => [handle]), projectPublishers, active]) {
  const result = spawnSync(process.execPath, ["--import", "tsx", "-e", scenario], {
    cwd: root,
    env: { ...process.env, WITHDRAWN_PUBLISHERS: JSON.stringify(held) },
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  process.stdout.write(result.stdout);
}
