import newsletterData from "@/data/newsletter-data.json";

export type NewsletterCopy = {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
  success: string;
};

type NewsletterLocale = "en" | "zh";

interface NewsletterConfig {
  fallback: Record<NewsletterLocale, NewsletterCopy>;
  slugs: Record<string, Partial<Record<NewsletterLocale, Partial<NewsletterCopy>>>>;
}

const config = newsletterData as NewsletterConfig;

export function getNewsletterFallback(locale: NewsletterLocale): NewsletterCopy {
  return config.fallback[locale];
}

export function resolveNewsletterForPost(
  slug: string | null,
  locale: NewsletterLocale,
): NewsletterCopy {
  if (!slug) {
    return config.fallback[locale];
  }
  const override = config.slugs[slug]?.[locale];
  return override
    ? { ...config.fallback[locale], ...override }
    : config.fallback[locale];
}
