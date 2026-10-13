const minorWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "nor", "of", "on", "or", "per", "the", "to", "via", "with"]);

export function titleCase(value: string) {
  if (/[\u3400-\u9fff]/u.test(value)) return value;

  const words = value.split(/(\s+)/);
  const lexical = words.filter((word) => word.trim());
  let position = 0;

  return words.map((word) => {
    if (!word.trim()) return word;
    const current = position++;
    const lower = word.toLowerCase();
    const isEdge = current === 0 || current === lexical.length - 1;
    if (!isEdge && minorWords.has(lower)) return lower;

    return word.split("-").map((part) => {
      if (/^[A-Z0-9]{2,}$/.test(part) || /[a-z][A-Z]/.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join("-");
  }).join("");
}
