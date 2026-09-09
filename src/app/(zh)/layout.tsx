import { siteMetadata, RootShell } from "@/lib/root-shell";

export const metadata = siteMetadata;

export default function ZhRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootShell lang="zh" localePrefix="/zh">
      {children}
    </RootShell>
  );
}
