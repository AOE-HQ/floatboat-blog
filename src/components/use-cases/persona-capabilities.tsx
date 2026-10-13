import Link from "next/link";

import capabilities from "@/data/use-cases/capabilities.json";
import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";

export function PersonaCapabilities({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const items = capabilities[page.slug][page.locale];

  return <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]">{isZh ? "完成工作的能力组合" : "A capability stack for the work"}</p>
        <h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{isZh ? `围绕${page.breadcrumb}的实际工作，而不是堆叠功能。` : `Capabilities selected around the real work of ${page.breadcrumb}.`}</h2>
        <p className="mt-5 text-lg leading-7 text-[var(--ob-color-text-subtle)]">{isZh ? "工作站保存上下文，其他能力负责输入、执行、协作与交付。最终判断和重要行动仍由人控制。" : "The workspace holds context while supporting capabilities handle input, execution, collaboration, and delivery. People retain consequential decisions."}</p>
      </div>

      <div className="space-y-16 sm:space-y-24">{items.map(([title, href, description], index) => <article key={title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={index % 2 ? "lg:order-2" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-muted)]">0{index + 1}</p>
          <h3 className="mt-3 font-serif text-3xl sm:text-4xl"><Link href={href} className="underline decoration-black/15 underline-offset-8 transition hover:decoration-black">{title}</Link></h3>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--ob-color-text-subtle)]">{description}</p>
          <Link href={href} className="mt-6 inline-flex text-sm font-semibold hover:underline">{isZh ? `了解${title} →` : `Explore ${title} →`}</Link>
        </div>
        <div className={`${index % 2 ? "lg:order-1" : ""} rounded-[28px] border border-black/[0.08] bg-[var(--ob-color-surface)] p-5 shadow-[var(--ob-shadow-raised)]`}>
          <div className="rounded-2xl bg-[#24221f] p-5 text-white">
            <div className="flex items-center justify-between text-xs text-white/45"><span>Floatboat</span><span>{page.breadcrumb}</span></div>
            <div className="mt-8 rounded-xl bg-white/[0.07] p-4"><p className="text-xs text-[#f7d68b]">{title}</p><p className="mt-2 text-sm leading-6 text-white/75">{description}</p></div>
            <div className="mt-3 grid grid-cols-3 gap-2">{page.hero.preview.outputs.map((output) => <span key={output} className="rounded-lg border border-white/10 px-2 py-2 text-center text-[11px] text-white/55">{output}</span>)}</div>
          </div>
        </div>
      </article>)}</div>
    </div>
  </section>;
}
