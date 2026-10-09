import Link from "next/link";
import type { ReactNode } from "react";

import { ModelPickerDemo } from "./model-picker-demo";
import {
  localize,
  modelPath,
  type ModelFamily,
  type ModelLocale,
} from "@/lib/models/model-pages";

function Cta({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${primary ? "bg-[var(--ob-color-primary)] text-[var(--ob-color-text)] hover:bg-[var(--ob-color-primary-hover)]" : "border border-black/10 bg-white/55 hover:bg-white"}`}
    >
      {children}
    </a>
  );
}

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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: model.faq.map((item) => ({
        "@type": "Question",
        name: localize(item.question, locale),
        acceptedAnswer: {
          "@type": "Answer",
          text: localize(item.answer, locale),
        },
      })),
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
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ob-color-accent)]">
            {localize(model.badge, locale)} · Floatboat
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-7xl">
            {localize(model.hero.title, locale)}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">
            {localize(model.hero.description, locale)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Cta href={download} primary>
              {model.access === "capacity"
                ? isZh
                  ? "了解 Floatboat"
                  : "Explore Floatboat"
                : isZh
                  ? "下载 Floatboat"
                  : "Download Floatboat"}
            </Cta>
            <Link
              href={modelPath(locale)}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white/55 px-6 text-sm font-semibold hover:bg-white"
            >
              {isZh ? "查看全部模型" : "View all models"}
            </Link>
          </div>
        </div>
        <ModelPickerDemo model={model} locale={locale} />
      </section>

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

      <section className="border-y border-black/[0.06] bg-[#24221f] py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d68b]">
              {localize(model.positioning.eyebrow, locale)}
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              {localize(model.positioning.title, locale)}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              {localize(model.positioning.description, locale)}
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
            {model.positioning.traits.map((trait) => (
              <article key={trait.label.en} className="bg-[#2b2926] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f7d68b]">
                  {localize(trait.label, locale)}
                </p>
                <h3 className="mt-3 text-xl font-semibold">
                  {localize(trait.value, locale)}
                </h3>
                <p className="mt-3 leading-7 text-white/60">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">
              {localize(model.lineup.eyebrow, locale)}
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              {localize(model.lineup.title, locale)}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
              {localize(model.lineup.description, locale)}
            </p>
          </div>
          <div
            className={`grid gap-5 ${model.lineup.items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}
          >
            {model.lineup.items.map((item, index) => (
              <article
                key={item.title}
                className="rounded-3xl border border-black/[0.07] bg-[var(--ob-color-surface)] p-7 shadow-[var(--ob-shadow-raised)]"
              >
                <span className="text-xs font-semibold tracking-[0.16em] text-[var(--ob-color-muted)]">
                  0{index + 1} · {localize(item.label, locale)}
                </span>
                <h3 className="mt-8 break-words font-serif text-2xl tracking-tight">
                  {item.title}
                </h3>
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">
            {localize(model.workflows.eyebrow, locale)}
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">
              {localize(model.capabilities.eyebrow, locale)}
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
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
          <article className="rounded-3xl bg-[#e9f2de] p-7">
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
          <article className="rounded-3xl bg-[#f1ece4] p-7">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ob-color-accent)]">
              {localize(model.steps.eyebrow, locale)}
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
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
        <section className="bg-[#24221f] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d68b]">
                {localize(model.extensions.eyebrow, locale)}
              </p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
                {localize(model.extensions.title, locale)}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {model.extensions.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                >
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/65">
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

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="mb-8 text-center font-serif text-4xl tracking-tight sm:text-5xl">
          {model.name} · FAQ
        </h2>
        <div className="space-y-3">
          {model.faq.map((item) => (
            <details
              key={item.question.en}
              className="group rounded-2xl border border-black/[0.07] bg-white/45 p-5"
            >
              <summary className="cursor-pointer list-none pr-8 font-semibold">
                {localize(item.question, locale)}
                <span className="float-right text-xl group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">
                {localize(item.answer, locale)}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-[36px] bg-[#24221f] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <h2 className="font-serif text-4xl tracking-tight sm:text-6xl">
            {localize(model.finalCta.title, locale)}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/65">
            {localize(model.finalCta.description, locale)}
          </p>
          <div className="mt-8">
            <Cta href={download} primary>
              {isZh ? "下载 Floatboat" : "Download Floatboat"}
            </Cta>
          </div>
        </div>
      </section>
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
