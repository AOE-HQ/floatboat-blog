import { BlogLibraryPage } from "@/components/blog/blog-library-page";
import { blogLibraryMetadata } from "@/lib/blog-library";

export const metadata = blogLibraryMetadata("en");
export default function BlogIndexPage() {
  return <BlogLibraryPage locale="en" />;
}
