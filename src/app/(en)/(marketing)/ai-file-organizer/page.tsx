import { CoreFeatureRoute } from "@/components/landing/core-feature-route";
import { buildCoreFeatureMetadata, getCoreFeaturePage } from "@/lib/landing/core-feature-pages";

const page = getCoreFeaturePage("en", "ai-file-organizer");
export const metadata = buildCoreFeatureMetadata(page);
export default function FileOrganizerPage() {
  return <CoreFeatureRoute locale="en" slug="ai-file-organizer" />;
}
