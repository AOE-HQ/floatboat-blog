import { PersonaUseCasePage } from "@/components/use-cases/persona-use-case-page";
import { buildPersonaMetadata, getPersonaPage } from "@/lib/use-cases/persona-pages";

const page = getPersonaPage("zh", "lawyers");
export const metadata = buildPersonaMetadata(page);

export default function LawyersUseCasePage() {
  return <PersonaUseCasePage page={page} />;
}
