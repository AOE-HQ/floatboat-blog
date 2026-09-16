import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { OpenBlogProvider } from "@openblog/components";

import { absoluteUrl, site } from "@/config/site";
import type { BlogLocale } from "@/config/i18n";
import { AttributionWebCollector } from "@/components/analytics/attribution-web-collector";
import { config, getThemeColorModeClass } from "@/lib/openblog-config";

import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const siteMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
  },
};

type RootShellProps = {
  lang: BlogLocale;
  localePrefix?: "" | "/zh";
  children: React.ReactNode;
};

/** Shared html/body shell for (en) and (zh) route groups. */
export function RootShell({
  lang,
  localePrefix = "",
  children,
}: RootShellProps) {
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${getThemeColorModeClass()} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
        <OpenBlogProvider config={config} localePrefix={localePrefix}>
          <AttributionWebCollector />
          {children}
        </OpenBlogProvider>
      </body>
    </html>
  );
}
