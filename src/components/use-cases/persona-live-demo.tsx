import Link from "next/link";

import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";

export function PersonaLiveDemo({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const workflow = page.workflows.items[0];
  const downloadHref = page.hero.primaryCta.href.replace("download_placement=hero", "download_placement=live_demo");

  return <section aria-labelledby="live-demo-title" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
    <div className="overflow-hidden rounded-[28px] border border-black/[0.1] bg-[#fbfaf8] shadow-[0_20px_60px_rgba(27,26,24,0.09)]">
      <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[#1b1a18] text-xs font-semibold text-white">F</span>
          <div><p id="live-demo-title" className="text-sm font-semibold">Floatboat Agent</p><p className="text-xs text-[var(--ob-color-muted)]">{page.breadcrumb} · Live demo</p></div>
        </div>
        <span className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs text-[var(--ob-color-muted)]">{isZh ? "示例对话" : "Example chat"}</span>
      </div>

      <div className="grid gap-5 bg-[#f0eeeb] px-5 py-5 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="ml-auto max-w-2xl rounded-2xl rounded-br-md bg-[#1b1a18] px-4 py-3 text-sm leading-6 text-white lg:ml-0">
          <p>{workflow.job}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{page.hero.preview.inputs.map((item) => <span key={item} className="rounded-lg border border-white/10 bg-white/[0.08] px-2.5 py-1 text-xs text-white/70">＋ {item}</span>)}</div>
        </div>

        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--ob-color-muted)]"><span className="grid size-6 place-items-center rounded-full bg-[#f7d68b] text-[10px] text-[#1b1a18]">F</span>Floatboat Agent</div>
          <div className="rounded-2xl rounded-tl-md border border-black/[0.07] bg-white p-4">
            <p className="text-sm leading-6">{isZh ? `我会按照“${workflow.title}”流程整理这些材料，并把需要判断的部分交回给你。` : `I’ll organize these materials with the “${workflow.title}” workflow and return the judgment calls to you.`}</p>
            <div className="mt-3 overflow-hidden rounded-xl border border-black/[0.08] bg-[#fbfaf8]">
              <div className="border-b border-black/[0.07] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ob-color-muted)]">{isZh ? "Agent 执行记录" : "Agent activity"}</div>
              <ol className="grid sm:grid-cols-2">{workflow.flow.map((item, index) => <li key={item} className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2 text-xs sm:border-r"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#1b1a18] text-[9px] text-white">{index + 1}</span>{item}</li>)}</ol>
            </div>
            <div className="mt-3 rounded-xl bg-[#fff5d7] p-3">
              <div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-[0.14em]">{isZh ? "准备完成" : "Ready for review"}</p><span className="rounded-full bg-[#1b1a18] px-3 py-1 text-xs text-white">{page.hero.preview.review}</span></div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">{page.hero.preview.outputs.map((item) => <li key={item} className="rounded-lg bg-white/70 px-3 py-2 text-xs font-medium">{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/[0.08] bg-[#fbfaf8] p-3 sm:px-5">
        <Link href={downloadHref} className="flex items-center gap-3 rounded-xl border border-black/[0.1] bg-white p-2 shadow-sm transition hover:border-black/25" aria-label={isZh ? "下载 Floatboat 并运行这个工作流" : "Download Floatboat to run this workflow"}>
          <p className="flex-1 px-2 text-sm leading-6 text-[var(--ob-color-muted)]">{isZh ? "描述任务并添加文件，让 Floatboat Agent 开始工作……" : "Describe the task, add files, and let Floatboat Agent get to work…"}</p>
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#1b1a18] text-base text-white">↑</span>
        </Link>
        <div className="mt-2 flex items-center justify-between gap-4 text-[11px] text-[var(--ob-color-muted)]"><span>{isZh ? "界面预览 · 不会处理真实数据" : "Interface preview · No real data is processed"}</span><Link href={downloadHref} className="font-semibold text-[#1b1a18] hover:underline">{isZh ? "用 Floatboat 运行 →" : "Run it in Floatboat →"}</Link></div>
      </div>
    </div>
  </section>;
}
