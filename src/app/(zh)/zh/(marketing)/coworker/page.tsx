import { CoreFeatureRoute } from "@/components/landing/core-feature-route";
import { buildCoreFeatureMetadata, getCoreFeaturePage } from "@/lib/landing/core-feature-pages";

const page = getCoreFeaturePage("zh", "coworker");
export const metadata = buildCoreFeatureMetadata(page);
export default function CoworkerPage() { return <CoreFeatureRoute locale="zh" slug="coworker" />; }

