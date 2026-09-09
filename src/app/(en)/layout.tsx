import { siteMetadata, RootShell } from "@/lib/root-shell";

export const metadata = siteMetadata;

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell lang="en">{children}</RootShell>;
}
