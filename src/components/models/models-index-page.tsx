import Link from "next/link";

import { MODEL_FAMILIES, localize, modelPath, type ModelLocale } from "@/lib/models/model-pages";

const DOWNLOAD = "https://floatboat.ai/download/success?from=models&download_placement=models_index";

export function ModelsIndexPage({ locale }: { locale: ModelLocale }) {
  const isZh = locale === "zh";
  const pickerModels = MODEL_FAMILIES.filter((model) => model.access === "picker");
  const comboItems = MODEL_FAMILIES.flatMap((model) => model.lineup.items.filter((item) => item.meta.en.startsWith("Live ·")).map((item) => ({ model, item })));
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
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8">
        <Link href={isZh ? "/zh" : "/"}>{isZh ? "首页" : "Home"}</Link><span className="mx-2">/</span><span>{isZh ? "模型" : "Models"}</span>
      </nav>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ob-color-accent)]">{isZh ? "多模型 Agent Workspace" : "A multi-model Agent Workspace"}</p>
        <h1 className="mx-auto mt-5 max-w-5xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-7xl">
          {isZh ? "模型可以变化，工作空间不必重来。" : "Change the model without rebuilding the workspace."}
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">
          {isZh ? "开箱即用，无需自备 API Key。在同一个桌面工作空间中使用全员可用的 Auto Mode，或从订阅配置开放的模型中直接选择。" : "Ready out of the box with no API key required. Use Auto Mode, available to everyone, or directly select models enabled by your subscription configuration."}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={isZh ? DOWNLOAD.replace("/download/", "/zh/download/") : DOWNLOAD} className="inline-flex min-h-12 items-center rounded-full bg-[var(--ob-color-primary)] px-6 text-sm font-semibold hover:bg-[var(--ob-color-primary-hover)]">{isZh ? "下载 Floatboat" : "Download Floatboat"}</a>
          <Link href={isZh ? "/zh/agent-workspace" : "/agent-workspace"} className="inline-flex min-h-12 items-center rounded-full border border-black/10 bg-white/55 px-6 text-sm font-semibold hover:bg-white">{isZh ? "了解 Agent Workspace" : "Explore Agent Workspace"}</Link>
        </div>
      </section>

      <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{isZh ? "可用路径" : "Available paths"}</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{isZh ? "客户端当前可选模型" : "Models available in the client"}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{isZh ? "使用 Auto 自动路由，或直接选择 Anthropic、OpenAI、Google 与 DeepSeek 的前沿模型。" : "Use Auto routing or directly select frontier models from Anthropic, OpenAI, Google, and DeepSeek."}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pickerModels.map((model, index) => (
              <Link key={model.slug} href={modelPath(locale, model.slug)} className={`group flex min-h-72 flex-col rounded-3xl border border-black/[0.07] p-7 shadow-[var(--ob-shadow-raised)] transition hover:-translate-y-1 ${index === 0 ? "bg-[#24221f] text-white lg:col-span-2" : "bg-[var(--ob-color-surface)]"}`}>
                <div className="flex items-start justify-between gap-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${index === 0 ? "bg-white/10 text-[#f7d68b]" : "bg-black/[0.05] text-[var(--ob-color-muted)]"}`}>{localize(model.badge, locale)}</span><span className="text-lg transition group-hover:translate-x-1">→</span></div>
                <div className="mt-auto pt-12"><h3 className="font-serif text-3xl tracking-tight">{model.name}</h3><p className={`mt-3 max-w-xl leading-7 ${index === 0 ? "text-white/65" : "text-[var(--ob-color-text-subtle)]"}`}>{localize(model.summary, locale)}</p>{model.slug !== "auto-mode" && <p className={`mt-4 text-xs leading-5 ${index === 0 ? "text-white/50" : "text-[var(--ob-color-muted)]"}`}>{model.lineup.items.map((item) => item.title).join(" · ")}</p>}</div>
              </Link>
            ))}
          </div>
          <div className="mb-10 mt-20 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{isZh ? "多模态 Combo" : "Multimedia Combos"}</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{isZh ? "已上线的图像与视频执行引擎" : "Live image and video engines"}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{isZh ? "这些模型通过内置 Combo Skill 调用，不出现在主对话模型下拉菜单中。" : "These models run through built-in Combo Skills rather than the main chat-model dropdown."}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {comboItems.map(({ model, item }) => (
              <Link key={item.title} href={modelPath(locale, model.slug)} className="group flex min-h-64 flex-col rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)] transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4"><span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{localize(item.meta, locale)}</span><span className="text-lg transition group-hover:translate-x-1">→</span></div>
                <div className="mt-auto pt-10"><h3 className="font-serif text-2xl tracking-tight">{item.title}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{localize(item.description, locale)}</p><p className="mt-4 text-xs leading-5 text-[var(--ob-color-muted)]">{model.name}</p></div>
              </Link>
            ))}
          </div>
          <div className="mb-10 mt-20 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">{isZh ? "底层能力" : "Configured capacity"}</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{isZh ? "配置已完成，尚未在主选择器露出" : "Configured below the client picker"}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">{isZh ? "这些模型已经完成容量预算或协议适配，但当前不在客户端主选择器中。" : "These models have capacity budgets or protocol adapters in place, but are not exposed in the main client picker."}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capacityModels.map((model) => (
              <Link key={model.slug} href={modelPath(locale, model.slug)} className="group flex min-h-64 flex-col rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)] transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4"><span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-semibold text-[var(--ob-color-muted)]">{localize(model.badge, locale)}</span><span className="text-lg transition group-hover:translate-x-1">→</span></div>
                <div className="mt-auto pt-10"><h3 className="font-serif text-3xl tracking-tight">{model.name}</h3><p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{localize(model.summary, locale)}</p><p className="mt-4 text-xs leading-5 text-[var(--ob-color-muted)]">{model.lineup.items.map((item) => item.title).join(" · ")}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"><div className="rounded-[36px] bg-[#24221f] px-6 py-14 text-center text-white sm:px-12 sm:py-20"><h2 className="font-serif text-4xl tracking-tight sm:text-6xl">{isZh ? "一个工作空间，多种模型能力。" : "One workspace. Multiple model capabilities."}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">{isZh ? "让模型选择服务于工作，而不是让工作被模型选择器拆散。" : "Make model choice serve the work instead of fragmenting the work across model pickers."}</p><a href={isZh ? DOWNLOAD.replace("/download/", "/zh/download/") : DOWNLOAD} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--ob-color-primary)] px-6 text-sm font-semibold text-[var(--ob-color-text)]">{isZh ? "下载 Floatboat" : "Download Floatboat"}</a></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
