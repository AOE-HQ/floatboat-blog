"use client";

import { useState } from "react";

import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";

type DemoStage = "inputs" | "process" | "outputs";

export function PersonaLiveDemo({ page }: { page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const workflow = page.workflows.items[0];
  const [stage, setStage] = useState<DemoStage>("inputs");
  const stages: Array<{ id: DemoStage; label: string }> = [
    { id: "inputs", label: isZh ? "1 · 工作材料" : "1 · Materials" },
    { id: "process", label: isZh ? "2 · 执行步骤" : "2 · Workflow" },
    { id: "outputs", label: isZh ? "3 · 可审阅结果" : "3 · Reviewable output" },
  ];

  return <section aria-labelledby="live-demo-title" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
    <div className="overflow-hidden rounded-[32px] border border-black/[0.08] bg-[#fbfaf8] shadow-[0_24px_80px_rgba(27,26,24,0.1)]">
      <div className="grid border-b border-black/[0.08] lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-[#24221f] p-7 text-white sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d68b]">Live demo</p>
          <h2 id="live-demo-title" className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{workflow.title}</h2>
          <p className="mt-4 text-sm leading-6 text-white/60">{workflow.job}</p>
          <p className="mt-8 text-xs leading-5 text-white/40">{isZh ? "交互式流程预览 · 不会上传或处理真实数据" : "Interactive workflow preview · No real data is uploaded or processed"}</p>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={isZh ? "演示步骤" : "Demo stages"}>
            {stages.map((item) => <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={stage === item.id}
              onClick={() => setStage(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${stage === item.id ? "bg-[#1b1a18] text-white" : "border border-black/[0.09] bg-white text-[var(--ob-color-text-subtle)] hover:border-black/25"}`}
            >{item.label}</button>)}
          </div>

          <div className="mt-7 min-h-52 rounded-2xl bg-[#f0eeeb] p-5 sm:p-6" role="tabpanel">
            {stage === "inputs" && <>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{page.hero.preview.matter}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">{page.hero.preview.inputs.map((item) => <li key={item} className="rounded-xl border border-black/[0.07] bg-white p-4 text-sm font-medium">{item}</li>)}</ul>
              <button type="button" onClick={() => setStage("process")} className="mt-6 rounded-full bg-[#f7d68b] px-5 py-2.5 text-sm font-semibold text-[#1b1a18]">{isZh ? "查看执行步骤 →" : "See the workflow →"}</button>
            </>}

            {stage === "process" && <>
              <ol className="grid gap-3 sm:grid-cols-2">{workflow.flow.map((item, index) => <li key={item} className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-white p-4 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#1b1a18] text-xs text-white">{index + 1}</span>{item}</li>)}</ol>
              <button type="button" onClick={() => setStage("outputs")} className="mt-6 rounded-full bg-[#f7d68b] px-5 py-2.5 text-sm font-semibold text-[#1b1a18]">{isZh ? "查看可审阅结果 →" : "See the output →"}</button>
            </>}

            {stage === "outputs" && <>
              <div className="flex items-center justify-between gap-4"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ob-color-muted)]">{isZh ? "准备完成" : "Prepared for review"}</p><span className="rounded-full bg-[#1b1a18] px-3 py-1 text-xs font-semibold text-white">{page.hero.preview.review}</span></div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">{page.hero.preview.outputs.map((item) => <li key={item} className="flex items-center gap-2 rounded-xl border border-black/[0.07] bg-white p-4 text-sm font-medium"><span className="grid size-4 place-items-center rounded bg-[#f7d68b] text-[10px]">✓</span>{item}</li>)}</ul>
              <p className="mt-5 border-l-2 border-[#1b1a18] pl-4 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{workflow.boundary}</p>
            </>}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
