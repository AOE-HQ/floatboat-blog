import { HowSection } from "@/components/marketing/how-section";
import { ModelMechanismSection } from "./model-mechanism-section";
import { UseCasesSection } from "@/components/marketing/use-cases-section";
import { localizeUseCases } from "@/lib/marketing/use-cases";
import { OverviewSection } from "@/components/marketing/overview-section";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { FaqBand } from "@/components/faq-band";
import { FinalCta } from "@/components/final-cta";
import { RelatedPageLinks } from "@/components/related-page-links";
import { MarketingHero } from "@/components/marketing/marketing-hero";

import { ModelPickerDemo } from "./model-picker-demo";
import {
  localize,
  modelPath,
  modelAvailabilityLabel,
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
      <Breadcrumb label={isZh ? "面包屑导航" : "Breadcrumb"} items={[{ label: isZh ? "首页" : "Home", href: isZh ? "/zh" : "/" }, { label: isZh ? "模型" : "Models", href: modelPath(locale) }, { label: model.name, href: modelPath(locale, model.slug) }]} />
      <MarketingHero layout="centered" title={localize(model.hero.title, locale)} description={localize(model.hero.description, locale)}
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

      <OverviewSection
        variant="features"
        id="model-introduction"
        title={localize(model.positioning.title, locale)}
        paragraphs={[localize(model.positioning.description, locale)]}
        items={model.positioning.traits.map((trait) => ({
          title: localize(trait.value, locale),
          label: localize(trait.label, locale),
          description: localize(trait.description, locale),
        }))}
      />

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
                  {modelAvailabilityLabel(item.availability, locale)}
                  {item.availability === "combo" && <span className="block mt-1">{localize(item.meta, locale).split(" · ").slice(1).join(" · ")}</span>}
                </p>
                {item.source && <p className="mt-3 text-xs leading-6 text-[var(--ob-color-muted)]"><a href={item.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{isZh ? "官方价格页" : "Official pricing page"}</a> · {item.source.checkedAt}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <UseCasesSection {...localizeUseCases(model.useCases, locale)} locale={locale} />

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

      {model.mechanism && <ModelMechanismSection title={localize(model.mechanism.title, locale)} items={model.mechanism.items.map(item => ({ title: localize(item.title, locale), description: localize(item.description, locale) }))} />}
      {model.howTo && <HowSection locale={locale} title={localize(model.howTo.title, locale)} description={localize(model.howTo.description, locale)} items={model.howTo.items.map(item => ({ title: localize(item.title, locale), description: localize(item.description, locale), completion: localize(item.completion, locale) }))} />}

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
