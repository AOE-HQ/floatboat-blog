/** FAQPage structured data builder (Alignify-compatible). */
export function buildFaqSchema(
  items: Array<{ question: string; answer: string }>,
  locale?: "zh" | "en",
) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  if (locale) {
    schema.inLanguage = locale === "zh" ? "zh-CN" : "en-US";
  }

  return schema;
}
