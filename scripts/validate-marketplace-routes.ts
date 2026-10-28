import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { buildCombinedSitemapXml } from "../src/lib/sitemap";
import { pathForLocale } from "../src/lib/locale-path";

// The directory owns only /skills-marketplace. Combo Store belongs to the main app.
const ingress = readFileSync("k8s/ingress-main.yaml", "utf8");
const hosts = ingress.split("    - host: ").slice(1);
assert.equal(hosts.length, 2);
for (const host of hosts) {
  assert(!host.includes("/combostore"), "Main-site Combo Store must not be intercepted");
  for (const prefix of ["", "/zh"]) {
    const block = `          - path: ${prefix}/skills-marketplace\n            pathType: Prefix\n            backend:\n              service:\n                name: floatboat-blog\n`;
    assert.equal(host.split(block).length - 1, 1, "Each host must own one marketplace subtree per locale");
  }
}
const sitemap = buildCombinedSitemapXml();
assert(!sitemap.includes("/combostore"), "The blog sitemap must not publish main-app routes");
const paths = [...sitemap.matchAll(/<loc>https:\/\/floatboat.ai((?:\/zh)?\/skills-marketplace[^<]*)<\/loc>/g)].map((match) => match[1]);
assert(paths.length > 100, "The complete directory must be included");
assert.equal(new Set(paths).size, paths.length, "Duplicate directory sitemap URL");
for (const path of paths) {
  const zh = path.startsWith("/zh/");
  const counterpart = pathForLocale(path, zh ? "en" : "zh");
  assert(paths.includes(counterpart), `${path}: missing language counterpart`);
  assert.equal(pathForLocale(counterpart, zh ? "zh" : "en"), path);
}
for (const folder of ["src/app/(en)/(marketing)", "src/app/(zh)/zh/(marketing)"]) {
  assert(existsSync(`${folder}/skills-marketplace/page.tsx`));
  assert(!existsSync(`${folder}/combostore`), "Old local routes must be removed rather than redirected");
}
const config = readFileSync("next.config.ts", "utf8");
assert(!config.includes("combostore"), "Do not redirect or rewrite the main-app namespace");
console.log(`Validated ${paths.length} localized marketplace sitemap URLs, language switching, both ingress hosts, and released Combo Store routes.`);
