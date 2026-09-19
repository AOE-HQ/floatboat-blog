"use client";

import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getLocaleFromPathname } from "@/lib/locale-path";

const FB_SITE = "https://floatboat.ai";

const DOWNLOAD_QUERY =
  "?from=landing&download_placement=landing_primary&download_entry_point=landing_header";

type NavMenuItem = {
  en: string;
  zh: string;
  descEn: string;
  descZh: string;
  path: string;
};

type NavMenuGroup = {
  en: string;
  zh: string;
  items: NavMenuItem[];
};

function menuItemHref(item: NavMenuItem, isZh: boolean): string {
  return `${FB_SITE}${isZh ? "/zh" : ""}${item.path}`;
}

/** Dropdown menus mirror the floatboat.ai main-site navigation (产品/市场/资源). */
const NAV_MENUS: NavMenuGroup[] = [
  {
    en: "Products",
    zh: "产品",
    items: [
      {
        en: "Flow Mode",
        zh: "心流模式",
        descEn: "Speak and iterate — ideas become finished work in real time",
        descZh: "边说边改，让想法实时变成成品",
        path: "/flow-mode",
      },
      {
        en: "AI Scheduling Assistant",
        zh: "AI 日程助理",
        descEn: "Let a calendar Agent truly execute the work blocks it schedules",
        descZh: "让日历 Agent 真正执行它安排的工作块",
        path: "/ai-scheduling-assistant",
      },
      {
        en: "AI File Organizer",
        zh: "AI 文件整理器",
        descEn: "Organize and rename messy folders on your machine",
        descZh: "在本机自动整理并重命名杂乱文件夹",
        path: "/ai-file-organizer",
      },
      {
        en: "FloatIM",
        zh: "FloatIM",
        descEn: "Native group chat for humans and Agents",
        descZh: "面向人类与 Agent 的原生群聊",
        path: "/floatim",
      },
      {
        en: "Skills Marketplace",
        zh: "Skills Marketplace",
        descEn: "Run open Agent Skills natively in Floatboat",
        descZh: "在 Floatboat 中原生运行开放 Agent Skills",
        path: "/skills-marketplace",
      },
    ],
  },
  {
    en: "Marketplace",
    zh: "市场",
    items: [
      {
        en: "Combo Store",
        zh: "Combo 商店",
        descEn: "Discover and install reusable Combo Skills",
        descZh: "发现并安装可复用的 Combo Skills",
        path: "/combostore",
      },
      {
        en: "Timeshop",
        zh: "Timeshop",
        descEn: "Browse subscribable automation calendars",
        descZh: "浏览可订阅的自动化日历",
        path: "/timeshop",
      },
      {
        en: "Clawbot Store",
        zh: "Clawbot 商店",
        descEn: "Discover WeChat Agents ready to try right now",
        descZh: "发现可立即试用的微信 Agent",
        path: "/clawbot",
      },
    ],
  },
  {
    en: "Resources",
    zh: "资源",
    items: [
      {
        en: "Blog",
        zh: "博客",
        descEn: "Opinions, guides, and user stories",
        descZh: "观点、指南与用户故事",
        path: "/blog",
      },
      {
        en: "News",
        zh: "新闻",
        descEn: "The latest from Floatboat",
        descZh: "Floatboat 最新动态",
        path: "/news/harness-benchmark?from=header",
      },
      {
        en: "Wishlist",
        zh: "心愿单",
        descEn: "Submit feature requests and shape the roadmap",
        descZh: "提交功能需求，一起塑造路线图",
        path: "/wishlist",
      },
    ],
  },
];

const NAV_LINKS = [
  { en: "Pricing", zh: "价格", href: `${FB_SITE}/pricing`, zhHref: `${FB_SITE}/zh/pricing` },
  { en: "About", zh: "关于", href: `${FB_SITE}/about`, zhHref: `${FB_SITE}/zh/about` },
];

/**
 * Header chrome copied 1:1 from floatboat.ai (same bar, spacing, nav and CTA):
 * warm translucent blur bar without border, logo → main home, nav always
 * visible and centered, right cluster (language + Download pill) hidden below
 * md. Nav includes the main-site 产品/市场/资源 hover dropdowns; dropdown
 * panels are pure CSS (group-hover) with no Radix dependency. Only deviations:
 * the logo asset is served from /blog/brand and the language control is a
 * working EN↔中文 toggle instead of a dropdown.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const isZh = locale === "zh";

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--ob-color-bg-glass)] backdrop-blur-[16px]">
      <div className="mx-auto max-w-[1440px] px-10 max-lg:px-5">
        <div className="flex h-[76px] items-center gap-5">
          <div className="flex-1">
            <a
              href={isZh ? `${FB_SITE}/zh` : FB_SITE}
              target="_self"
              aria-label="floatboat"
              title="floatboat"
              className="inline-flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/blog/brand/floatboat-logo.svg"
                alt="floatboat"
                width={126}
                height={36}
                className="h-8 w-auto"
              />
            </a>
          </div>

          <nav
            aria-label="Primary"
            className="relative flex max-w-max flex-1 shrink-0 items-center justify-center"
          >
            <ul className="flex flex-1 list-none items-center justify-center gap-6">
              {NAV_MENUS.map((group) => (
                <li key={group.en} className="group relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="flex h-10 cursor-pointer items-center gap-1 rounded-md px-0 text-sm font-medium text-[var(--ob-color-muted)] transition-colors hover:text-[var(--ob-color-text)] group-hover:text-[var(--ob-color-text)]"
                  >
                    <span>{isZh ? group.zh : group.en}</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="rounded-xl border border-black/[0.06] bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                      {group.items.map((item) => (
                        <a
                          key={item.en}
                          target="_self"
                          href={menuItemHref(item, isZh)}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--ob-color-surface-hover)]"
                        >
                          <span className="block text-sm font-semibold text-[var(--ob-color-text)]">
                            {isZh ? item.zh : item.en}
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-[var(--ob-color-muted)]">
                            {isZh ? item.descZh : item.descEn}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              {NAV_LINKS.map((link) => (
                <li key={link.en}>
                  <a
                    target="_self"
                    aria-label={isZh ? link.zh : link.en}
                    title={isZh ? link.zh : link.en}
                    href={isZh ? link.zhHref : link.href}
                    className="flex h-10 items-center justify-center rounded-md px-0 text-sm font-medium text-[var(--ob-color-muted)] transition-colors hover:text-[var(--ob-color-text)]"
                  >
                    <span>{isZh ? link.zh : link.en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
            <LanguageSwitcher />
            <a
              className="inline-flex h-9 min-h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full px-[14px] text-[14px] font-medium leading-[20px] transition-colors bg-[var(--ob-color-primary)] text-[var(--ob-color-text)] hover:bg-[var(--ob-color-primary-hover)]"
              title={isZh ? "下载" : "Download"}
              aria-label={isZh ? "下载" : "Download"}
              href={
                isZh
                  ? `${FB_SITE}/zh/download/success${DOWNLOAD_QUERY}&download_link_text=${encodeURIComponent("下载")}`
                  : `${FB_SITE}/download/success${DOWNLOAD_QUERY}&download_link_text=Download`
              }
            >
              {isZh ? "下载" : "Download"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
