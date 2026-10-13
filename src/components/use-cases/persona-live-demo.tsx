"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";

export function PersonaLiveDemo({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const workflow = page.workflows.items[0];
  const downloadHref = page.hero.primaryCta.href.replace("download_placement=hero", "download_placement=live_demo");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const complete = visibleSteps > workflow.flow.length;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const timer = window.setTimeout(() => setVisibleSteps(workflow.flow.length + 1), 0);
      return () => window.clearTimeout(timer);
    }
    const timers = Array.from({ length: workflow.flow.length + 1 }, (_, index) => window.setTimeout(() => setVisibleSteps(index + 1), 500 + index * 650));
    return () => timers.forEach(window.clearTimeout);
  }, [workflow.flow.length]);

  return <section aria-labelledby="live-demo-title" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
    <div className="overflow-hidden rounded-[24px] border border-black/[0.12] bg-[#f7f6f3] shadow-[0_20px_60px_rgba(27,26,24,0.1)]">
      <div className="flex items-center justify-between border-b border-black/[0.08] bg-[#fbfaf8] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-black/15" /><span className="size-2.5 rounded-full bg-black/15" /><span className="size-2.5 rounded-full bg-black/15" /></div>
          <span className="h-4 w-px bg-black/10" />
          <div><p id="live-demo-title" className="text-xs font-semibold">Floatboat Agent</p><p className="text-[10px] text-[var(--ob-color-muted)]">{page.breadcrumb} · {page.hero.preview.matter}</p></div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--ob-color-muted)]"><span className="size-1.5 rounded-full bg-[#1b1a18]" />{complete ? (isZh ? "等待指令" : "Ready") : (isZh ? "正在工作" : "Working")}</div>
      </div>

      <div className="mx-auto min-h-[360px] max-w-4xl px-4 py-6 sm:px-8">
        <div className="ml-auto max-w-2xl rounded-2xl rounded-br-sm bg-[#1b1a18] px-4 py-3 text-sm leading-6 text-white">
          <p>{workflow.job}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{page.hero.preview.inputs.map((item) => <span key={item} className="rounded-md border border-white/10 bg-white/[0.07] px-2 py-1 text-[11px] text-white/65">▱ {item}</span>)}</div>
        </div>

        <div className="mt-6 grid grid-cols-[26px_1fr] gap-3">
          <span className="grid size-6 place-items-center rounded-md bg-[#f7d68b] text-[10px] font-bold text-[#1b1a18]">F</span>
          <div className="min-w-0">
            <p className="text-sm leading-6">{isZh ? `我会运行“${workflow.title}”流程，先读取你提供的材料。` : `I’ll run the “${workflow.title}” workflow, starting with the materials you provided.`}</p>

            <div className="mt-4 overflow-hidden rounded-xl border border-black/[0.08] bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.06] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ob-color-muted)]"><span>{isZh ? "执行记录" : "Activity"}</span><span>{Math.min(visibleSteps, workflow.flow.length)}/{workflow.flow.length}</span></div>
              <ol className="divide-y divide-black/[0.05]">
                {workflow.flow.map((item, index) => {
                  const done = index < visibleSteps;
                  const active = index === visibleSteps;
                  return <li key={item} className={`flex min-h-9 items-center gap-3 px-3 py-2 text-xs transition-opacity duration-300 ${done || active ? "opacity-100" : "opacity-25"}`}>
                    <span className={`grid size-4 shrink-0 place-items-center rounded-full text-[9px] ${done ? "bg-[#1b1a18] text-white" : active ? "border border-[#1b1a18] text-[#1b1a18] animate-pulse" : "border border-black/20 text-transparent"}`}>{done ? "✓" : "·"}</span>
                    <span>{item}</span>
                    {active && <span className="ml-auto text-[10px] text-[var(--ob-color-muted)]">{isZh ? "执行中…" : "Running…"}</span>}
                  </li>;
                })}
              </ol>
            </div>

            <div className="mt-4 min-h-20">
              {complete ? <div className="rounded-xl bg-[#fff5d7] p-4 animate-in fade-in duration-500">
                <div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold">{isZh ? "已生成，可供审阅" : "Generated · ready for review"}</p><span className="rounded-full bg-[#1b1a18] px-2.5 py-1 text-[10px] text-white">{page.hero.preview.review}</span></div>
                <ul className="mt-3 flex flex-wrap gap-2">{page.hero.preview.outputs.map((item) => <li key={item} className="rounded-md border border-black/[0.06] bg-white/75 px-3 py-2 text-xs font-medium">{item}</li>)}</ul>
              </div> : <p className="text-sm leading-6 text-[var(--ob-color-text-subtle)]">{isZh ? "正在整理上下文并生成可编辑交付物" : "Organizing context and preparing editable deliverables"}<span className="ml-1 inline-block h-4 w-0.5 translate-y-0.5 bg-[#1b1a18] animate-pulse" /></p>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/[0.08] bg-[#fbfaf8] p-3 sm:px-5">
        <Link href={downloadHref} className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-black/[0.12] bg-white p-2 shadow-sm transition hover:border-black/30" aria-label={isZh ? "下载 Floatboat 并运行这个工作流" : "Download Floatboat to run this workflow"}>
          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-black/[0.08] text-lg text-black/45">＋</span>
          <p className="flex-1 text-sm text-[var(--ob-color-muted)]">{isZh ? "继续追问，添加文件，或让 Agent 修改交付物……" : "Ask a follow-up, add files, or ask the agent to revise the deliverable…"}</p>
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#1b1a18] text-base text-white">↑</span>
        </Link>
        <div className="mx-auto mt-2 flex max-w-4xl items-center justify-between gap-4 text-[10px] text-[var(--ob-color-muted)]"><span>{isZh ? "流式界面预览 · 不会处理真实数据" : "Streaming interface preview · No real data is processed"}</span><Link href={downloadHref} className="font-semibold text-[#1b1a18] hover:underline">{isZh ? "在 Floatboat 中运行 →" : "Run in Floatboat →"}</Link></div>
      </div>
    </div>
  </section>;
}
