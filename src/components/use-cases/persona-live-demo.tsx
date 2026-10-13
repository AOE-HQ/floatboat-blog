import Link from "next/link";

import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";

export function PersonaLiveDemo({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const workflow = page.workflows.items[0];
  const downloadHref = page.hero.primaryCta.href.replace("download_placement=hero", "download_placement=live_demo");

  return <section aria-labelledby="live-demo-title" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
    <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-black/[0.1] bg-[#fbfaf8] shadow-[0_24px_80px_rgba(27,26,24,0.1)]">
      <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[#1b1a18] text-xs font-semibold text-white">F</span>
          <div><p id="live-demo-title" className="text-sm font-semibold">Floatboat Agent</p><p className="text-xs text-[var(--ob-color-muted)]">{page.breadcrumb} · Live demo</p></div>
        </div>
        <span className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs text-[var(--ob-color-muted)]">{isZh ? "示例对话" : "Example chat"}</span>
      </div>

      <div className="space-y-7 bg-[#f0eeeb] px-5 py-7 sm:px-8 sm:py-9">
        <div className="ml-auto max-w-2xl rounded-3xl rounded-br-md bg-[#1b1a18] px-5 py-4 text-sm leading-7 text-white">
          <p>{workflow.job}</p>
          <div className="mt-4 flex flex-wrap gap-2">{page.hero.preview.inputs.map((item) => <span key={item} className="rounded-lg border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs text-white/70">＋ {item}</span>)}</div>
        </div>

        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--ob-color-muted)]"><span className="grid size-6 place-items-center rounded-full bg-[#f7d68b] text-[10px] text-[#1b1a18]">F</span>Floatboat Agent</div>
          <div className="rounded-3xl rounded-tl-md border border-black/[0.07] bg-white p-5 sm:p-6">
            <p className="text-sm leading-7">{isZh ? `我会按照“${workflow.title}”流程整理这些材料，并把需要判断的部分交回给你。` : `I’ll organize these materials with the “${workflow.title}” workflow and return the judgment calls to you.`}</p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.08] bg-[#fbfaf8]">
              <div className="border-b border-black/[0.07] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ob-color-muted)]">{isZh ? "Agent 执行记录" : "Agent activity"}</div>
              <ol className="divide-y divide-black/[0.06]">{workflow.flow.map((item, index) => <li key={item} className="flex items-center gap-3 px-4 py-3 text-sm"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#1b1a18] text-[10px] text-white">{index + 1}</span>{item}</li>)}</ol>
            </div>
            <div className="mt-5 rounded-2xl bg-[#fff5d7] p-5">
              <div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-[0.14em]">{isZh ? "准备完成" : "Ready for review"}</p><span className="rounded-full bg-[#1b1a18] px-3 py-1 text-xs text-white">{page.hero.preview.review}</span></div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">{page.hero.preview.outputs.map((item) => <li key={item} className="rounded-xl bg-white/70 px-3 py-3 text-sm font-medium">{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/[0.08] bg-[#fbfaf8] p-4 sm:p-5">
        <Link href={downloadHref} className="flex items-end gap-3 rounded-2xl border border-black/[0.1] bg-white p-3 shadow-sm transition hover:border-black/25" aria-label={isZh ? "下载 Floatboat 并运行这个工作流" : "Download Floatboat to run this workflow"}>
          <p className="min-h-12 flex-1 px-2 py-2 text-sm leading-6 text-[var(--ob-color-muted)]">{isZh ? "描述你的任务，添加文件，让 Floatboat Agent 开始工作……" : "Describe the task, add your files, and let Floatboat Agent get to work…"}</p>
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#1b1a18] text-lg text-white">↑</span>
        </Link>
        <div className="mt-3 flex items-center justify-between gap-4 text-[11px] text-[var(--ob-color-muted)]"><span>{isZh ? "界面预览 · 不会处理真实数据" : "Interface preview · No real data is processed"}</span><Link href={downloadHref} className="font-semibold text-[#1b1a18] hover:underline">{isZh ? "用 Floatboat 运行 →" : "Run it in Floatboat →"}</Link></div>
      </div>
    </div>
  </section>;
}
