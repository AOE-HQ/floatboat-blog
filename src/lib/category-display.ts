/**
 * Canonical per-locale display names for post categories.
 * Post frontmatter stores the English name only, so zh UI
 * resolves the label here instead of trusting `category`.
 */
const CATEGORY_NAMES: Record<string, { en: string; zh: string }> = {
  "ai-agents": { en: "AI Agents", zh: "AI 智能体" },
  "calendar-ai": { en: "Calendar AI", zh: "日历 AI" },
  "file-management": { en: "File Management", zh: "文件管理" },
  "model-benchmarks": { en: "Model & Benchmarks", zh: "模型与基准" },
  "product-updates": { en: "Product Updates", zh: "产品动态" },
  "solo-operators": { en: "Solo Operators", zh: "独立工作者" },
  "tool-comparisons": { en: "Tool Comparisons", zh: "工具对比" },
};

export function categoryDisplayName(slug: string, locale: "en" | "zh"): string {
  return CATEGORY_NAMES[slug]?.[locale] ?? slug;
}
