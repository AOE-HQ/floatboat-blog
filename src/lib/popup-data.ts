import popupData from "@/data/popup-data.json";

export type PopupCopy = {
  title: string;
  body: string;
};

type PopupLocale = "en" | "zh";

interface PopupConfig {
  fallback: Record<PopupLocale, PopupCopy>;
  slugs: Record<string, Partial<Record<PopupLocale, PopupCopy>>>;
}

const config = popupData as PopupConfig;

export function resolvePopupForPost(
  slug: string | null,
  locale: PopupLocale,
): PopupCopy {
  if (!slug) {
    return config.fallback[locale];
  }
  const override = config.slugs[slug]?.[locale];
  return override
    ? { ...config.fallback[locale], ...override }
    : config.fallback[locale];
}
