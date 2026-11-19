import fallback from "./site-footer-default.json";
import { siteFooterSchema } from "./site-footer-contract";

const defaultConfig = siteFooterSchema.parse(fallback);

export async function loadSiteFooter() {
  const origin = process.env.SITE_FOOTER_API_ORIGIN || "https://floatboat.ai";
  try {
    const response = await fetch(new URL("/api/public/site-footer", origin), {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(1500),
      redirect: "error",
    });
    if (response.ok) {
      const result = siteFooterSchema.safeParse(await response.json());
      if (result.success) return result.data;
    }
  } catch {
    // The service can render its own snapshot independently.
  }
  return defaultConfig;
}
