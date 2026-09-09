export type FinalCta = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type FinalCtaInput = {
  title: string;
  /** Single prose block below the title */
  description?: string;
  /** Legacy MD paragraphs or split copy — merged into one description */
  paragraphs?: string[];
  /** @deprecated Merged into `description` */
  descriptions?: string[];
  buttonLabel: string;
  href: string;
};

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function mergeDescriptionParts(parts: string[]): string {
  return parts.map(collapseWhitespace).filter(Boolean).join(" ");
}

/** One-line title + single description paragraph. */
export function normalizeFinalCta(input: FinalCtaInput): FinalCta {
  const bodyParts: string[] = [];

  if (input.description) {
    bodyParts.push(input.description);
  }
  if (input.descriptions?.length) {
    bodyParts.push(...input.descriptions);
  }
  if (input.paragraphs?.length) {
    bodyParts.push(...input.paragraphs);
  }

  return {
    title: collapseWhitespace(input.title),
    description: mergeDescriptionParts(bodyParts),
    buttonLabel: input.buttonLabel.trim(),
    href: input.href.trim(),
  };
}
