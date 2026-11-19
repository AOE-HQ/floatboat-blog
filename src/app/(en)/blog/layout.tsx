import { resolveBlogChrome } from "@/chrome/resolve-chrome";

export const revalidate = 3600;

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Header, Footer } = await resolveBlogChrome("en");

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
