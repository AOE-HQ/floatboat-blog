import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { FaqBand } from "@/components/faq-band";
import hubFaqs from "@/data/landing-hub-faqs.json";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { MarketingHero } from "@/components/marketing/marketing-hero";

import { MODEL_FAMILIES, localize, modelPath, modelAvailabilityLabel, type ModelLocale } from "@/lib/models/model-pages";

const DOWNLOAD = "https://floatboat.ai/download/success?from=models&download_placement=models_index";

export function ModelsIndexPage({ locale }: { locale: ModelLocale }) {
  const isZh = locale === "zh";
  const pickerModels = MODEL_FAMILIES.filter((model) => model.access === "picker");
  const comboItems = MODEL_FAMILIES.flatMap((model) => model.lineup.items.filter((item) => item.availability === "combo").map((item) => ({ model, item })));
  const announcedItems = MODEL_FAMILIES.flatMap((model) => model.lineup.items.filter((item) => item.availability === "announced").map((item) => ({ model, item })));
  const capacityModels = MODEL_FAMILIES.filter((model) => model.access === "capacity");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isZh ? "Floatboat 模型" : "AI Models in Floatboat",
    description: isZh ? "在同一个 Agent Workspace 中选择不同模型与 Auto Mode。" : "Choose models and Auto Mode inside one Agent Workspace.",
    url: `https://floatboat.ai${modelPath(locale)}`,
  };

  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <Breadcrumb label={isZh ? "面包屑导航" : "Breadcrumb"} items={[{ label: isZh ? "首页" : "Home", href: isZh ? "/zh" : "/" }, { label: isZh ? "模型" : "Models", href: modelPath(locale) }]} />
      <MarketingHero layout="centered" title={isZh ? "模型可以变化，工作空间不必重来。" : "Change the model without rebuilding the workspace."}
        description={isZh ? "开箱即用，无需自备 API Key。在同一个桌面工作空间中使用 Auto / Lite 自动路由，或从订阅配置开放的模型中直接选择。" : "Ready out of the box with no API key required. Use the Auto / Lite routing option or directly select models enabled by your subscription configuration."}
      />

      <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{isZh ? "对话模型与自动路由" : "Chat models and automatic routing"}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{isZh ? "这里整理已有对话接入记录；自动模式在用户指南中也称 Lite mode。模型列表会在线更新，实际入口和套餐资格以客户端为准。" : "These families have recorded chat routes. The guide also calls automatic routing Lite mode. The list changes online; check the client for current entries and plan eligibility."}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pickerModels.map((model, index) => (
              <Link key={model.slug} href={modelPath(locale, model.slug)} className={`group flex min-h-72 flex-col rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)] transition hover:-translate-y-1 ${index === 0 ? "lg:col-span-2" : ""}`}>
                <div className="flex items-start justify-between gap-4"><span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{localize(model.badge, locale)}</span><span className="text-lg transition group-hover:translate-x-1">→</span></div>
                <div className="mt-auto pt-12"><h3 className="font-serif text-3xl tracking-tight">{model.name}</h3><p className="mt-3 max-w-xl leading-7 text-[var(--ob-color-text-subtle)]">{localize(model.summary, locale)}</p>{model.slug !== "auto-mode" && <p className="mt-4 text-xs leading-5 text-[var(--ob-color-muted)]">{model.lineup.items.filter((item) => item.availability === "picker").map((item) => item.title).join(" · ")}</p>}</div>
              </Link>
            ))}
          </div>
          <div id="new-models" className="mb-10 mt-20 max-w-3xl">
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{isZh ? "官网新增列出的型号" : "New Models Listed by Floatboat"}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{isZh ? "2026 年 11 月 2 日核对的价格页已展示以下型号。公开列出不等于每个账号都能选择；客户端入口、准确 Model ID 和套餐资格仍需按实际菜单确认。" : "The pricing page checked on November 2, 2026 names these models. Public listing does not establish access for every account; confirm the client entry, exact runtime ID, and plan eligibility."} <a href="https://floatboat.ai/pricing" className="underline underline-offset-4">{isZh ? "查看官方价格页" : "Official pricing page"}</a></p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {announcedItems.map(({ model, item }) => <Link key={item.title} href={modelPath(locale, model.slug)} className="group flex flex-col rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 transition hover:-translate-y-1">
              <h3 className="break-words font-serif text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm text-[var(--ob-color-muted)]">{modelAvailabilityLabel(item.availability, locale)} · {model.name}</p>
              <p className="mt-4 leading-7 text-[var(--ob-color-text-subtle)]">{localize(item.description, locale)}</p>
            </Link>)}
          </div>
          <div className="mb-10 mt-20 max-w-3xl">
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{isZh ? "图像与视频的 Combo 接入记录" : "Image and Video Combo Records"}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{isZh ? "已有记录通过内置 Combo Skill 调用图像和视频型号，具体版本以 Combo 当前配置为准；新增的 Seedance 2.5 单独列在官网展示型号中。" : "These records use built-in Combo Skills rather than chat selection. Check the current Combo configuration for the engine version; Seedance 2.5 is listed separately above."}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {comboItems.map(({ model, item }) => (
              <Link key={item.title} href={modelPath(locale, model.slug)} className="group flex min-h-64 flex-col rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)] transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4"><span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{modelAvailabilityLabel(item.availability, locale)}</span><span className="text-lg transition group-hover:translate-x-1">→</span></div>
                <div className="mt-auto pt-10"><h3 className="break-words font-serif text-2xl tracking-tight">{item.title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{localize(item.description, locale)}</p><p className="mt-4 text-xs leading-5 text-[var(--ob-color-muted)]">{model.name}</p></div>
              </Link>
            ))}
          </div>
          <div className="mb-10 mt-20 max-w-3xl">
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{isZh ? "历史容量与协议配置记录" : "Capacity and Protocol Configuration Records"}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{isZh ? "底层配置记录不能证明当前客户端开放状态。Kimi K3 等型号也已出现在价格页；应同时核对当前菜单，不能仅凭旧配置判断是否可选。" : "Configuration records do not establish current client availability. Names such as Kimi K3 also appear on the pricing page; check the current menu rather than treating an older configuration snapshot as a live inventory."}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capacityModels.map((model) => (
              <Link key={model.slug} href={modelPath(locale, model.slug)} className="group flex min-h-64 flex-col rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)] transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4"><span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{localize(model.badge, locale)}</span><span className="text-lg transition group-hover:translate-x-1">→</span></div>
                <div className="mt-auto pt-10"><h3 className="font-serif text-3xl tracking-tight">{model.name}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{localize(model.summary, locale)}</p><p className="mt-4 text-xs leading-5 text-[var(--ob-color-muted)]">{model.lineup.items.filter((item) => item.availability === "configured").map((item) => item.title).join(" · ")}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqBand locale={locale} items={hubFaqs.models[locale]} />
    <FinalCta
        title={isZh ? "按任务与接入入口比较模型" : "Compare models by task and access path"}
        description={isZh ? "先确认哪些模型可在对话中选择、哪些通过生图或视频 Combo 使用，以及哪些仅完成底层配置，再决定下一项任务怎么做。" : "See which models are selectable in chat, available through image or video Combos, or only configured below the picker before starting work."}
        primary={{ label: isZh ? "下载 Floatboat" : "Download Floatboat", href: isZh ? DOWNLOAD.replace("/download/", "/zh/download/") : DOWNLOAD }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
