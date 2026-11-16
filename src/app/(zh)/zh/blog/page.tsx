import { BlogLibraryPage } from "@/components/blog/blog-library-page";
import { blogLibraryMetadata } from "@/lib/blog-library";

export const metadata = blogLibraryMetadata("zh");
export default function BlogIndexPage() {
  return <BlogLibraryPage locale="zh" />;
}
