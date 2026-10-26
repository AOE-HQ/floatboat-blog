import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublisherDirectoryPage } from "@/components/skills/publisher-directory-page";
import { PUBLISHER_HANDLES, getPublisherDirectory, publisherDirectoryPath } from "@/lib/skills/publisher-directories";

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHER_HANDLES.map((author) => ({ author }));
}

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
  const { author } = await params;
  const directory = getPublisherDirectory(author);
  if (!directory) return {};
  const canonical = `https://floatboat.ai${publisherDirectoryPath("zh", author)}`;
  const title = directory.zh.seoTitle;
  const description = directory.zh.seoDescription;
  return { title, description, alternates: { canonical, languages: { en: `https://floatboat.ai${publisherDirectoryPath("en", author)}`, zh: canonical } }, openGraph: { type: "website", title, description, url: canonical } };
}

export default async function PublisherPage({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params;
  const directory = getPublisherDirectory(author);
  if (!directory) notFound();
  return <PublisherDirectoryPage locale="zh" handle={author} directory={directory} />;
}
