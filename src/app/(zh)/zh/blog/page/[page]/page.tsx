import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogLibraryPage } from "@/components/blog/blog-library-page";
import { blogLibraryMetadata, blogPageCount, parseBlogPage } from "@/lib/blog-library";

export const dynamicParams = false;
type Props = { params: Promise<{ page: string }> };
export function generateStaticParams() {
  return Array.from({ length: blogPageCount("zh") - 1 }, (_, i) => ({ page: String(i + 2) }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parseBlogPage((await params).page, blogPageCount("zh"));
  return page ? blogLibraryMetadata("zh", page) : {};
}
export default async function ArchivePage({ params }: Props) {
  const page = parseBlogPage((await params).page, blogPageCount("zh"));
  if (!page) notFound();
  return <BlogLibraryPage locale="zh" page={page} />;
}
