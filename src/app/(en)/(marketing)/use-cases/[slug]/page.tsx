import { notFound } from "next/navigation";

import { PersonaUseCasePage } from "@/components/use-cases/persona-use-case-page";
import { buildPersonaMetadata, getPersonaPage, isPersonaSlug, PERSONA_SLUGS } from "@/lib/use-cases/persona-pages";

export function generateStaticParams() {
  return PERSONA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/use-cases/[slug]">) {
  const { slug } = await params;
  if (!isPersonaSlug(slug)) return {};
  return buildPersonaMetadata(getPersonaPage("en", slug));
}

export default async function PersonaPage({ params }: PageProps<"/use-cases/[slug]">) {
  const { slug } = await params;
  if (!isPersonaSlug(slug)) notFound();
  return <PersonaUseCasePage page={getPersonaPage("en", slug)} />;
}
