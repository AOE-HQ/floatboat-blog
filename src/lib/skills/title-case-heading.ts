const minorWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "nor", "of", "on", "or", "the", "to", "via", "vs", "with"]);

/** Format visible English publisher headings without changing prose or SEO metadata. */
export function titleCaseHeading(value: string): string {
  const matches = [...value.matchAll(/[A-Za-z][A-Za-z0-9]*(?:[-'][A-Za-z0-9]+)*/g)];
  return value.replace(/[A-Za-z][A-Za-z0-9]*(?:[-'][A-Za-z0-9]+)*/g, (word, offset: number) => {
    const isFirstOrLast = offset === matches[0]?.index || offset === matches.at(-1)?.index;
    const followsColon = /[:—]\s*$/.test(value.slice(0, offset));
    if (!isFirstOrLast && !followsColon && minorWords.has(word.toLowerCase())) return word.toLowerCase();
    if (word === word.toUpperCase() || /[a-z][A-Z]/.test(word)) return word;
    return word.split("-").map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase()).join("-");
  });
}

export function publisherHeading(locale: "en" | "zh", value: string): string {
  return locale === "en" ? titleCaseHeading(value).replace(/\bZ\.Ai\b/g, "Z.ai") : value;
}
