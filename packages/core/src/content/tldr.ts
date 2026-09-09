export type TldrContent = {
  introduction: string;
  items: string[];
};

const TLDR_HEADING = /^##\s+TL;DR\s*$/i;
const BLOCKQUOTE_TLDR = /^>\s*\*\*TL;DR\*\*/i;
const BULLET_LINE = /^\s*[-*]\s+(.+)$/;
const HR_LINE = /^\*\s+\*\s+\*$|^\*\*\*+$|^---+\s*$/;

function isBulletLine(line: string): boolean {
  return BULLET_LINE.test(line.trim());
}

function parseBullet(line: string): string {
  return line.trim().replace(/^[-*]\s+/, "").trim();
}

function normalizeLegacyBulletsOnly(bullets: string[]): TldrContent {
  return {
    introduction: bullets[0] ?? "",
    items: bullets.length > 1 ? bullets.slice(1) : bullets,
  };
}

function parseTldrSection(raw: string): TldrContent | null {
  const lines = raw.split("\n");
  const prose: string[] = [];
  const bullets: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || HR_LINE.test(trimmed)) {
      continue;
    }

    if (isBulletLine(line)) {
      bullets.push(parseBullet(line));
      continue;
    }

    if (BLOCKQUOTE_TLDR.test(trimmed)) {
      const rest = trimmed.replace(/^>\s*\*\*TL;DR\*\*\s*/, "").trim();
      if (rest) {
        prose.push(rest);
      }
      continue;
    }

    if (trimmed.startsWith(">")) {
      prose.push(trimmed.replace(/^>\s?/, "").trim());
      continue;
    }

    prose.push(trimmed);
  }

  const introduction = prose.join(" ").trim();

  if (!introduction && bullets.length === 0) {
    return null;
  }

  if (!introduction && bullets.length > 0) {
    return normalizeLegacyBulletsOnly(bullets);
  }

  if (introduction && bullets.length === 0) {
    return { introduction, items: [] };
  }

  return { introduction, items: bullets };
}

/** Extract structured TL;DR (intro prose + bullets) from markdown body. */
export function extractTldrFromContent(content: string): TldrContent | null {
  const lines = content.split("\n");
  let mode: "none" | "heading" | "blockquote" = "none";
  const sectionLines: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (mode === "none") {
      if (TLDR_HEADING.test(trimmed)) {
        mode = "heading";
        continue;
      }

      if (BLOCKQUOTE_TLDR.test(trimmed)) {
        mode = "blockquote";
        sectionLines.push(line);
        continue;
      }

      continue;
    }

    if (mode === "heading") {
      if (/^##\s+/.test(trimmed)) {
        break;
      }
      sectionLines.push(line);
      continue;
    }

    if (mode === "blockquote") {
      if (trimmed.startsWith(">")) {
        sectionLines.push(line);
        continue;
      }

      if (!trimmed) {
        continue;
      }

      break;
    }
  }

  if (!sectionLines.length && mode === "none") {
    return null;
  }

  return parseTldrSection(sectionLines.join("\n"));
}

/** Remove TL;DR block (## heading or blockquote variant) from markdown body. */
export function stripTldrFromContent(content: string): string {
  const lines = content.split("\n");
  const out: string[] = [];
  let mode: "none" | "heading" | "blockquote" = "none";

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (mode === "none") {
      if (TLDR_HEADING.test(trimmed)) {
        mode = "heading";
        continue;
      }

      if (BLOCKQUOTE_TLDR.test(trimmed)) {
        mode = "blockquote";
        continue;
      }

      out.push(line);
      continue;
    }

    if (mode === "heading") {
      if (/^##\s+/.test(trimmed)) {
        mode = "none";
        out.push(line);
      }
      continue;
    }

    if (mode === "blockquote") {
      if (trimmed.startsWith(">")) {
        continue;
      }

      if (!trimmed) {
        continue;
      }

      mode = "none";
      out.push(line);
    }
  }

  return out.join("\n").replace(/^\s*\n+/, "").trimStart();
}

/** @deprecated Flat string for backward compatibility */
export function tldrToPlainText(tldr: TldrContent): string {
  return [tldr.introduction, ...tldr.items].filter(Boolean).join(" ");
}
