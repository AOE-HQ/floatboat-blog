"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { blogPathForLocale } from "@/config/i18n";
import { getLocaleFromPathname } from "@/lib/locale-path";

const FB_SITE = "https://floatboat.ai";

function SocialIcon({ label, title, href, children }: {
  label: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={title}
      className="inline-flex size-5 items-center justify-center text-[#7a7671] transition-colors hover:text-[#1b1a18]"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/**
 * Mirrors the official floatboat.ai footer chrome: newsletter card, logo +
 * tagline + socials, then legal bar with Blog / Privacy / Terms.
 */
export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const blogHref = blogPathForLocale(locale);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer id="footer">
      <div className="mx-auto max-w-[1440px]">
        <div className="px-5 pt-12 pb-8 sm:px-10 max-lg:px-5">
          <div className="grid gap-6 rounded-[24px] border border-black/[0.08] bg-[#fbfaf8]/70 p-6 shadow-sm sm:p-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="font-serif text-2xl leading-snug font-medium tracking-[-0.01em] text-[#1b1a18] sm:text-3xl">
                Notes from the Proactive Agent.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#7a7671]">
                Field notes on running work from the calendar — plus new Combos,
                agent tactics, and product updates. No spam.
              </p>
            </div>
            {subscribed ? (
              <p className="text-sm leading-relaxed text-[#7a7671]">
                订阅在官网首页统一维护。前往{" "}
                <a
                  href={FB_SITE}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#1b1a18] underline underline-offset-2"
                >
                  floatboat.ai
                </a>{" "}
                Subscribe to keep everything in one list.
              </p>
            ) : (
              <form
                className="flex w-full flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <label className="sr-only" htmlFor="footer-newsletter-email">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  placeholder="you@yourcompany.com"
                  className="min-h-12 flex-1 rounded-full border border-black/[0.12] bg-[#f0eeeb] px-5 py-3 text-sm text-[#1b1a18] placeholder:text-[#7a7671]/60 focus:border-[#1b1a18]/30 focus:ring-2 focus:ring-[#1b1a18]/15 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1b1a18] px-6 py-3 text-sm font-medium text-[#f0eeeb] shadow-md transition hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5 py-6 sm:px-10 sm:flex-row sm:items-center sm:justify-between max-lg:px-5">
          <div className="flex flex-col items-start gap-3">
            <a
              className="inline-flex items-end gap-2"
              aria-label="floatboat"
              title="floatboat"
              href={FB_SITE}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/floatboat-logo.svg"
                alt="floatboat"
                width={775}
                height={256}
                className="h-9 w-auto"
              />
            </a>
            <p className="text-sm font-medium text-[#7a7671]">
              Sail onward with what you&apos;ve learned
            </p>
          </div>
          <div className="flex items-center gap-6 text-[#7a7671]">
            <SocialIcon label="X" title="X" href="https://x.com/float_schedule?s=11">
              <XIcon />
            </SocialIcon>
            <SocialIcon
              label="LinkedIn"
              title="LinkedIn"
              href="https://www.linkedin.com/company/floatboat/"
            >
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon
              label="Discord"
              title="Discord"
              href="https://discord.gg/Ecp2PR24H4"
            >
              <DiscordIcon />
            </SocialIcon>
          </div>
        </div>

        <div className="h-px w-full bg-black/[0.08]" />

        <div className="flex flex-col gap-4 px-5 py-6 sm:px-10 sm:flex-row sm:items-start sm:justify-between max-lg:px-5">
          <p className="text-sm font-normal text-[#71717a]">
            © {new Date().getFullYear()} AOE Tech Labs Limited. The Proactive
            Agent that Runs Work from the Calendar.
          </p>
          <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-center sm:gap-6">
            <a
              aria-label="Blog"
              title="Blog"
              href={blogHref}
              className="flex h-10 items-center justify-center px-[10px] py-[5px] text-sm font-medium text-[#7a7671] transition-colors hover:text-[#1b1a18]"
            >
              Blog
            </a>
            <a
              aria-label="Privacy Policy"
              title="Privacy Policy"
              href={`${FB_SITE}/privacy`}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center justify-center px-[10px] py-[5px] text-sm font-medium text-[#7a7671] transition-colors hover:text-[#1b1a18]"
            >
              Privacy Policy
            </a>
            <a
              aria-label="Terms of Service"
              title="Terms of Service"
              href={`${FB_SITE}/terms`}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center justify-center px-[10px] py-[5px] text-sm font-medium text-[#7a7671] transition-colors hover:text-[#1b1a18]"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
