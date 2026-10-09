import { CoreFeatureRoute } from "@/components/landing/core-feature-route";
import { buildCoreFeatureMetadata, getCoreFeaturePage } from "@/lib/landing/core-feature-pages";

const page = getCoreFeaturePage("zh", "floatim");
export const metadata = buildCoreFeatureMetadata(page);
export default function FloatIMPage() {
  return <CoreFeatureRoute locale="zh" slug="floatim" />;
}
