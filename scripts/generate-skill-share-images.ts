import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { FEATURED_SKILLS } from "../src/lib/skills/featured-skills";
import { skillShareImagePath } from "../src/lib/skills/skill-metadata";

function escapeXml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function lines(text: string) {
  const result: string[] = [];
  for (const word of text.split(/\s+/)) {
    const last = result.at(-1);
    if (last && last.length + word.length + 1 <= 27) result[result.length - 1] = `${last} ${word}`;
    else result.push(word);
  }
  return result;
}

async function main() {
const logo = (await readFile(path.resolve("public/blog/brand/floatboat-logo.svg"))).toString("base64");
for (const skill of FEATURED_SKILLS) {
  const title = lines(skill.name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f1efea"/>
<image href="data:image/svg+xml;base64,${logo}" x="76" y="52" width="184" height="55"/>
<path d="M76 145H1124" stroke="#d2cec5"/>
${title.map((line, index) => `<text x="76" y="${260 + index * 86}" font-family="Georgia,Times,serif" font-size="76" font-weight="600" fill="#1b1a18">${escapeXml(line)}</text>`).join("\n")}
<text x="80" y="${290 + title.length * 86}" font-family="Arial,sans-serif" font-size="30" fill="#5d5a54">by ${escapeXml(skill.publisher)}</text>
<path d="M76 520H1124" stroke="#d2cec5"/>
<text x="80" y="568" font-family="Arial,sans-serif" font-size="24" fill="#5d5a54">Installation · Use cases · How to</text>
<text x="1120" y="568" text-anchor="end" font-family="Arial,sans-serif" font-size="24" fill="#5d5a54">floatboat.ai</text>
</svg>`;
  const filename = path.resolve(`public${skillShareImagePath(skill.authorHandle, skill.slug)}`);
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, await sharp(Buffer.from(svg)).webp({ quality: 88 }).toBuffer());
}
console.log(`Generated ${FEATURED_SKILLS.length} Skill share images (1200×630 WebP).`);

}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
