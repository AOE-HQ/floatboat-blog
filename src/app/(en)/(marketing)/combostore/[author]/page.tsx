import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublisherDirectoryPage } from "@/components/skills/publisher-directory-page";
import { PUBLISHER_HANDLES } from "@/lib/skills/publisher-directories";
import { getPublisherProfile, publisherProfilePath } from "@/lib/skills/publisher-profiles";

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHER_HANDLES.map((author) => ({ author }));
}

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
  const { author } = await params;
  const profile = getPublisherProfile(author);
  if (!profile) return {};
  const canonical = `https://floatboat.ai${publisherProfilePath("en", author)}`;
  const title = profile.en.seoTitle;
  const description = profile.en.seoDescription;
  return { title, description, alternates: { canonical, languages: { en: canonical, zh: `https://floatboat.ai${publisherProfilePath("zh", author)}` } }, openGraph: { type: "website", title, description, url: canonical } };
}

export default async function PublisherPage({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params;
  if (!getPublisherProfile(author)) notFound();
  return <PublisherDirectoryPage locale="en" handle={author} />;
}
