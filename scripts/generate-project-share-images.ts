import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { PROJECTS } from "../src/lib/projects/project-pages";
import { projectShareImagePath } from "../src/lib/projects/project-metadata";
import { getPublisherProfile } from "../src/lib/skills/publisher-profiles";

const escapeXml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function main() {
  const logo = (await readFile("public/blog/brand/floatboat-logo.svg")).toString("base64");
  for (const project of PROJECTS) {
    const publisher = getPublisherProfile(project.author)!;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f1efea"/>
<image href="data:image/svg+xml;base64,${logo}" x="76" y="52" width="184" height="55"/>
<path d="M76 145H1124" stroke="#d2cec5"/>
<text x="76" y="285" font-family="Georgia,Times,serif" font-size="76" font-weight="600" fill="#1b1a18">${escapeXml(project.name)}</text>
<text x="80" y="355" font-family="Arial,sans-serif" font-size="30" fill="#5d5a54">${escapeXml(project.en.kind)}</text>
<text x="80" y="420" font-family="Arial,sans-serif" font-size="26" fill="#5d5a54">by ${escapeXml(publisher.name)}</text>
<path d="M76 520H1124" stroke="#d2cec5"/>
<text x="80" y="568" font-family="Arial,sans-serif" font-size="24" fill="#5d5a54">Workflow patterns · Tools · Review</text>
<text x="1120" y="568" text-anchor="end" font-family="Arial,sans-serif" font-size="24" fill="#5d5a54">floatboat.ai</text>
</svg>`;
    const filename = path.resolve(`public${projectShareImagePath(project.author, project.slug)}`);
    await mkdir(path.dirname(filename), { recursive: true });
    await writeFile(filename, await sharp(Buffer.from(svg)).webp({ quality: 88 }).toBuffer());
  }
  console.log(`Generated ${PROJECTS.length} project share images (1200×630 WebP).`);
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
