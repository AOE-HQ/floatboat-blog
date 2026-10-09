import { CoreFeaturePage } from "./core-feature-page";
import { getCoreFeaturePage, type CoreFeatureSlug, type LandingLocale } from "@/lib/landing/core-feature-pages";

export function CoreFeatureRoute({ locale, slug }: { locale: LandingLocale; slug: CoreFeatureSlug }) {
  return <CoreFeaturePage page={getCoreFeaturePage(locale, slug)} />;
}
