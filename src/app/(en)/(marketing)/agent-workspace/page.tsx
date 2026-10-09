import { CoreFeatureRoute } from "@/components/landing/core-feature-route";
import { buildCoreFeatureMetadata, getCoreFeaturePage } from "@/lib/landing/core-feature-pages";

const page = getCoreFeaturePage("en", "agent-workspace");
export const metadata = buildCoreFeatureMetadata(page);

export default function AgentWorkspacePage() {
  return <CoreFeatureRoute locale="en" slug="agent-workspace" />;
}
