"use client";

import { usePathname } from "next/navigation";

import { blogPathForLocale } from "@/config/i18n";
import { getLocaleFromPathname } from "@/lib/locale-path";
import { resolveNewsletterForPost } from "@/lib/newsletter-data";

import { NewsletterSubscribe } from "./newsletter-subscribe";

const FB_SITE = "https://floatboat.ai";
const EN_POST_PATH = /^\/blog\/([^/]+)\/?$/;
const ZH_POST_PATH = /^\/zh\/blog\/([^/]+)\/?$/;

/** Blog post slug from the current pathname, or null for hubs/non-post routes. */
function postSlugFromPathname(pathname: string, locale: "en" | "zh"): string | null {
  const match = (locale === "zh" ? ZH_POST_PATH : EN_POST_PATH).exec(pathname);
  return match ? match[1] : null;
}

/**
 * Social icons copied from the floatboat.ai footer: 20×20 viewBox, same paths.
 */
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
      className="inline-flex size-5 items-center justify-center text-[var(--ob-color-muted)] transition-colors hover:text-[var(--ob-color-text)]"
    >
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5">
        {children}
      </svg>
    </a>
  );
}

function EmailIcon() {
  return (
    <path
      d="M2.49984 2.5H17.4998C17.9601 2.5 18.3332 2.8731 18.3332 3.33333V16.6667C18.3332 17.1269 17.9601 17.5 17.4998 17.5H2.49984C2.0396 17.5 1.6665 17.1269 1.6665 16.6667V3.33333C1.6665 2.8731 2.0396 2.5 2.49984 2.5ZM16.6665 6.0316L10.0597 11.9483L3.33317 6.01328V15.8333H16.6665V6.0316ZM3.75939 4.16667L10.0514 9.71833L16.2507 4.16667H3.75939Z"
      fill="currentColor"
    />
  );
}

function XIcon() {
  return (
    <path
      d="M15.2721 1.58643H18.0833L11.9416 8.606L19.1668 18.1581H13.5095L9.07852 12.3648L4.00845 18.1581H1.19552L7.76469 10.6498L0.833496 1.58643H6.63442L10.6397 6.8817L15.2721 1.58643ZM14.2854 16.4754H15.8432L5.78799 3.1807H4.11638L14.2854 16.4754Z"
      fill="currentColor"
    />
  );
}

function LinkedInIcon() {
  return (
    <g clipPath="url(#clip0_floatboat_footer_linkedin)">
      <path
        d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"
        fill="currentColor"
      />
    </g>
  );
}

function DiscordIcon() {
  return (
    <path
      d="M16.9308 3.4629C15.6561 2.87799 14.2892 2.44707 12.8599 2.20025C12.8339 2.19549 12.8079 2.20739 12.7945 2.2312C12.6187 2.54388 12.4239 2.9518 12.2876 3.27242C10.7503 3.04228 9.22099 3.04228 7.71527 3.27242C7.57887 2.94467 7.37707 2.54388 7.20048 2.2312C7.18707 2.20819 7.16107 2.19629 7.13504 2.20025C5.70659 2.44628 4.33963 2.87721 3.06411 3.4629C3.05307 3.46766 3.04361 3.4756 3.03732 3.48591C0.444493 7.35954 -0.265792 11.138 0.0826501 14.8695C0.0842267 14.8878 0.0944749 14.9053 0.108665 14.9164C1.81934 16.1726 3.47642 16.9353 5.10273 17.4408C5.12876 17.4488 5.15634 17.4393 5.1729 17.4178C5.55761 16.8925 5.90054 16.3385 6.19456 15.756C6.21192 15.7219 6.19535 15.6814 6.15989 15.6679C5.61594 15.4616 5.098 15.21 4.59977 14.9243C4.56037 14.9013 4.55721 14.8449 4.59347 14.8179C4.69831 14.7394 4.80318 14.6576 4.9033 14.5751C4.92141 14.56 4.94665 14.5568 4.96794 14.5664C8.24107 16.0608 11.7846 16.0608 15.0191 14.5664C15.0404 14.5561 15.0657 14.5592 15.0846 14.5743C15.1847 14.6568 15.2895 14.7394 15.3952 14.8179C15.4314 14.8449 15.4291 14.9013 15.3897 14.9243C14.8914 15.2155 14.3735 15.4616 13.8288 15.6671C13.7933 15.6806 13.7775 15.7219 13.7949 15.756C14.0952 16.3377 14.4381 16.8917 14.8157 17.417C14.8315 17.4393 14.8599 17.4488 14.8859 17.4408C16.5201 16.9353 18.1772 16.1726 19.8879 14.9164C19.9028 14.9053 19.9123 14.8886 19.9139 14.8703C20.3309 10.5562 19.2154 6.80878 16.9568 3.4867C16.9513 3.4756 16.9419 3.46766 16.9308 3.4629ZM6.68335 12.5974C5.69792 12.5974 4.88594 11.6927 4.88594 10.5816C4.88594 9.47056 5.68217 8.56585 6.68335 8.56585C7.69239 8.56585 8.49651 9.4785 8.48073 10.5816C8.48073 11.6927 7.68451 12.5974 6.68335 12.5974ZM13.329 12.5974C12.3435 12.5974 11.5316 11.6927 11.5316 10.5816C11.5316 9.47056 12.3278 8.56585 13.329 8.56585C14.338 8.56585 15.1421 9.4785 15.1264 10.5816C15.1264 11.6927 14.338 12.5974 13.329 12.5974Z"
      fill="currentColor"
    />
  );
}

/**
 * Footer chrome copied 1:1 from floatboat.ai: newsletter card, logo + tagline
 * + socials (Email, X, LinkedIn, Discord), divider, then the legal bar with
 * locale-aware labels and the Contact link. The newsletter card keeps the
 * per-article copy feature; its design is identical to the main site.
 */
export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const isZh = locale === "zh";
  const blogHref = blogPathForLocale(locale);
  const slug = postSlugFromPathname(pathname, locale);
  const newsletterCopy = resolveNewsletterForPost(slug, locale);

  const legalLinkClass =
    "flex h-10 items-center justify-center px-[10px] py-[5px] text-[14px] leading-[1.43] font-medium text-[var(--ob-color-muted)] transition-colors hover:text-[var(--ob-color-text)]";

  return (
    <footer id="footer">
      <div className="mx-auto max-w-[1440px]">
        <div className="px-10 pt-12 pb-8 max-lg:px-5">
          <NewsletterSubscribe copy={newsletterCopy} />
        </div>

        <div className="flex flex-col gap-4 px-10 py-6 max-lg:px-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-3">
            <a
              className="inline-flex items-end gap-2"
              aria-label="floatboat"
              title="floatboat"
              href={isZh ? `${FB_SITE}/zh` : FB_SITE}
              target="_self"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/blog/brand/floatboat-logo.svg"
                alt="floatboat"
                width={775}
                height={256}
                className="h-9 w-auto"
              />
            </a>
            <p className="text-[14px] font-medium leading-[1.43] text-[var(--ob-color-muted)]">
              {isZh ? "知行合一，扬帆远航" : "Sail onward with what you've learned"}
            </p>
          </div>
          <div className="flex items-center gap-6 text-[var(--ob-color-muted)]">
            <SocialIcon label="Email" title="Email" href="mailto:contact@floatboat.ai">
              <EmailIcon />
            </SocialIcon>
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

        <div className="flex flex-col gap-4 px-10 py-6 max-lg:px-5 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-[14px] font-normal leading-[1.43] text-[var(--ob-color-muted)]">
            © {new Date().getFullYear()} AOE Tech Labs Limited.{" "}
            {isZh
              ? "让日历自动跑活的 Proactive Agent。"
              : "The Proactive Agent that Runs Work from the Calendar."}
          </p>
          <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-center sm:gap-6">
            <a aria-label={isZh ? "博客" : "Blog"} title={isZh ? "博客" : "Blog"} href={blogHref} className={legalLinkClass}>
              {isZh ? "博客" : "Blog"}
            </a>
            <a
              aria-label={isZh ? "隐私政策" : "Privacy Policy"}
              title={isZh ? "隐私政策" : "Privacy Policy"}
              href={isZh ? `${FB_SITE}/zh/privacy` : `${FB_SITE}/privacy`}
              target="_self"
              className={legalLinkClass}
            >
              {isZh ? "隐私政策" : "Privacy Policy"}
            </a>
            <a
              aria-label={isZh ? "用户协议" : "Terms of Service"}
              title={isZh ? "用户协议" : "Terms of Service"}
              href={isZh ? `${FB_SITE}/zh/terms` : `${FB_SITE}/terms`}
              target="_self"
              className={legalLinkClass}
            >
              {isZh ? "用户协议" : "Terms of Service"}
            </a>
            <a
              aria-label={isZh ? "联系" : "Contact"}
              title={isZh ? "联系" : "Contact"}
              href="mailto:contact@floatboat.ai"
              className={legalLinkClass}
            >
              {isZh ? "联系：contact@floatboat.ai" : "Contact: contact@floatboat.ai"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
