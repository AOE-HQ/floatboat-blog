import { resolveBlogChrome } from "@/chrome/resolve-chrome";

export const revalidate = 3600;

export default async function ZhBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Header, Footer } = await resolveBlogChrome("zh");

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
