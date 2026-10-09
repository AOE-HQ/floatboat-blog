import { CoreFeatureRoute } from "@/components/landing/core-feature-route";
import { buildCoreFeatureMetadata, getCoreFeaturePage } from "@/lib/landing/core-feature-pages";

const page = getCoreFeaturePage("en", "ai-scheduling-assistant");
export const metadata = buildCoreFeatureMetadata(page);
export default function SchedulingPage() {
  return <CoreFeatureRoute locale="en" slug="ai-scheduling-assistant" />;
}
