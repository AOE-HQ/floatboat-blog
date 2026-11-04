/** Locale-specific title copy is authored at its source; only branding is shared. */
export function seoTitle(body: string): string {
  const title = body.trim().replace(/\s*[|｜]\s*Floatboat\s*$/i, "");
  return `${title}｜Floatboat`;
}
