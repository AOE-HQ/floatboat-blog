import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublisherDirectoryPage } from "@/components/skills/publisher-directory-page";
import { getPublisherProfile, PUBLISHER_PROFILE_HANDLES } from "@/lib/skills/publisher-profiles";

import { buildPublisherMetadata } from "@/lib/skills/publisher-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHER_PROFILE_HANDLES.filter((handle) => !["vercel-labs", "morluto"].includes(handle)).map((author) => ({ author }));
}

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
  const { author } = await params;
  return buildPublisherMetadata(author, "zh");
}

export default async function PublisherPage({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params;
  if (!getPublisherProfile(author)) notFound();
  return <PublisherDirectoryPage locale="zh" handle={author} />;
}
