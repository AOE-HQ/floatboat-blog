import { CoreFeatureRoute } from "@/components/landing/core-feature-route";
import { buildCoreFeatureMetadata, getCoreFeaturePage } from "@/lib/landing/core-feature-pages";

const page = getCoreFeaturePage("zh", "agent-workspace");
export const metadata = buildCoreFeatureMetadata(page);

export default function AgentWorkspacePage() {
  return <CoreFeatureRoute locale="zh" slug="agent-workspace" />;
}
