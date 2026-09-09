export type SharePlatform = "twitter" | "linkedin" | "facebook" | "copy";

export interface ShareConfig {
  url: string;
  title: string;
}

export function getShareUrl(
  platform: SharePlatform,
  config: ShareConfig,
): string | null {
  const encodedUrl = encodeURIComponent(config.url);
  const encodedTitle = encodeURIComponent(config.title);

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    default:
      return null;
  }
}

export function openShareWindow(url: string) {
  window.open(url, "_blank", "width=600,height=400");
}
