import { FaqBand } from "@/components/faq-band";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { RelatedPageLinks } from "@/components/related-page-links";
import { MarketingHero } from "@/components/marketing/marketing-hero";

import { ModelPickerDemo } from "./model-picker-demo";
import {
  localize,
  modelPath,
  type ModelFamily,
  type ModelLocale,
} from "@/lib/models/model-pages";

export function ModelDetailPage({
  model,
  locale,
}: {
  model: ModelFamily;
  locale: ModelLocale;
}) {
  const isZh = locale === "zh";
  const download = `https://floatboat.ai${isZh ? "/zh" : ""}/download/success?from=models-${model.slug}&download_placement=model_detail`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${model.name} in Floatboat`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS, Windows",
      description: localize(model.hero.description, locale),
      url: `https://floatboat.ai${modelPath(locale, model.slug)}`,
    },
  ];

  return (
    <main className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-5 pt-6 text-sm text-[var(--ob-color-muted)] sm:px-8"
      >
        <Link href={isZh ? "/zh" : "/"}>{isZh ? "首页" : "Home"}</Link>
        <span className="mx-2">/</span>
        <Link href={modelPath(locale)}>{isZh ? "模型" : "Models"}</Link>
        <span className="mx-2">/</span>
        <span>{model.name}</span>
      </nav>
      <MarketingHero layout="split" title={localize(model.hero.title, locale)} description={localize(model.hero.description, locale)}
        action={model.access === "capacity" ? undefined : { label: isZh ? "下载 Floatboat" : "Download Floatboat", href: download }}
        media={{ kind: "demo", label: isZh ? `${model.name} 模型预览` : `${model.name} model preview`, content: <ModelPickerDemo model={model} locale={locale} /> }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <dl className="grid overflow-hidden rounded-3xl border border-black/[0.07] bg-white/55 sm:grid-cols-2 lg:grid-cols-4">
          {model.facts.map((fact) => (
            <div
              key={fact.label.en}
              className="border-b border-black/[0.06] p-5 last:border-b-0 sm:border-r lg:border-b-0"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">
                {localize(fact.label, locale)}
              </dt>
              <dd className="mt-2 text-sm font-semibold leading-6">
                {localize(fact.value, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-black/[0.06] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              {localize(model.positioning.title, locale)}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
              {localize(model.positioning.description, locale)}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {model.positioning.traits.map((trait) => (
              <article key={trait.label.en} className="rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7">
                <h3 className="text-xl font-semibold">
                  {localize(trait.value, locale)}
                </h3>
                <p className="mt-3 text-sm text-[var(--ob-color-muted)]">{localize(trait.label, locale)}</p>
                <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">
                  {localize(trait.description, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/45 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              {localize(model.lineup.title, locale)}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
              {localize(model.lineup.description, locale)}
            </p>
          </div>
          <div
            className={`grid gap-5 ${model.lineup.items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}
          >
            {model.lineup.items.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)]"
              >
                <h3 className="break-words font-serif text-2xl tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--ob-color-muted)]">{localize(item.label, locale)}</p>
                <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">
                  {localize(item.description, locale)}
                </p>
                <p className="mt-6 border-t border-black/[0.07] pt-4 text-xs font-medium text-[var(--ob-color-muted)]">
                  {localize(item.meta, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
            {localize(model.workflows.title, locale)}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
            {localize(model.workflows.description, locale)}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {model.workflows.items.map((item) => (
            <article
              key={item.title.en}
              className="rounded-3xl border border-black/[0.07] bg-white/50 p-7"
            >
              <h3 className="font-serif text-2xl">
                {localize(item.title, locale)}
              </h3>
              <p className="mt-5 text-sm font-semibold text-[var(--ob-color-accent)]">
                  {isZh ? "任务输入" : "Task input"}
              </p>
              <p className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">
                {localize(item.brief, locale)}
              </p>
              <p className="mt-5 text-sm font-semibold text-[var(--ob-color-accent)]">
                  {isZh ? "处理重点" : "Processing focus"}
              </p>
              <p className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">
                {localize(item.process, locale)}
              </p>
              <p className="mt-5 border-t border-black/[0.07] pt-5 text-sm font-semibold">
                  {isZh ? "预期结果：" : "Expected result: "}
                {localize(item.outcome, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              {localize(model.capabilities.title, locale)}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
              {localize(model.capabilities.description, locale)}
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {model.capabilities.items.map((item) => (
              <article
                key={item.title.en}
                className="rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7"
              >
                <h3 className="text-xl font-semibold">
                  {localize(item.title, locale)}
                </h3>
                <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">
                  {localize(item.description, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="max-w-3xl font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
          {localize(model.selection.title, locale)}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7">
            <h3 className="text-xl font-semibold">
              {localize(model.selection.choose.title, locale)}
            </h3>
            <ul className="mt-5 space-y-3">
              {model.selection.choose.items.map((item) => (
                <li key={item.en} className="flex gap-3 leading-7">
                  <span aria-hidden="true">✓</span>
                  <span>{localize(item, locale)}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7">
            <h3 className="text-xl font-semibold">
              {localize(model.selection.alternative.title, locale)}
            </h3>
            <ul className="mt-5 space-y-3">
              {model.selection.alternative.items.map((item) => (
                <li key={item.en} className="flex gap-3 leading-7">
                  <span aria-hidden="true">→</span>
                  <span>{localize(item, locale)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {model.steps && (
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              {localize(model.steps.title, locale)}
            </h2>
          </div>
          <ol className="grid gap-8 md:grid-cols-3">
            {model.steps.items.map((step, index) => (
              <li key={step.title.en}>
                <span className="font-serif text-5xl text-black/15">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">
                  {localize(step.title, locale)}
                </h3>
                <p className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">
                  {localize(step.description, locale)}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {model.extensions && (
        <section className="border-y border-black/[0.06] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                {localize(model.extensions.title, locale)}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {model.extensions.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)] p-7"
                >
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">
                    {localize(item.description, locale)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {model.comparison && (
        <section className="border-b border-black/[0.06] bg-white/45 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                {localize(model.comparison.title, locale)}
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
                {localize(model.comparison.description, locale)}
              </p>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-black/[0.08] bg-[var(--ob-color-surface)]">
              <div className="min-w-[680px]">
                <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] bg-[#24221f] px-5 py-4 text-sm font-semibold text-white">
                  <span>{isZh ? "能力" : "Capability"}</span>
                  <span>Floatboat</span>
                  <span>{isZh ? "网页聊天" : "Web chat"}</span>
                  <span>DIY API</span>
                </div>
                {model.comparison.rows.map((row) => (
                  <div
                    key={row.label.en}
                    className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-3 border-t border-black/[0.07] px-5 py-4 text-sm"
                  >
                    <strong>{localize(row.label, locale)}</strong>
                    {row.values.map((value, index) => (
                      <span
                        key={value.en}
                        className={
                          index === 0 ? "" : "text-[var(--ob-color-muted)]"
                        }
                      >
                        {localize(value, locale)}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <RelatedPageLinks family="models" currentId={model.slug} locale={locale} />

      <FaqBand locale={locale} title={isZh ? `${model.name} 常见问题` : `${model.name} FAQ`} items={model.faq.map((item) => ({ question: localize(item.question, locale), answer: localize(item.answer, locale) }))} />

      <FinalCta
        title={localize(model.finalCta.title, locale)}
        description={localize(model.finalCta.description, locale)}
        primary={model.access === "capacity"
          ? { label: isZh ? "查看已上线模型" : "Explore available models", href: modelPath(locale) }
          : { label: isZh ? "下载 Floatboat" : "Download Floatboat", href: download }}
      />
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </main>
  );
}
