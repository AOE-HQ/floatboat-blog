import Link from "next/link";

import capabilities from "@/data/use-cases/capabilities.json";
import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";
import { titleCase } from "@/lib/title-case";

const supportingCopy = {
  en: {
    "Agent Workspace": "The same context stays available across follow-ups, revisions, and recurring work, so the agent can continue from an inspectable project instead of starting over in a new chat.",
    "Flow Mode": "It is useful when the work becomes clearer through conversation: you can redirect the draft while it is taking shape instead of waiting for a complete first version.",
    "AI File Organizer": "The organizer handles file preparation as a separate, visible step; people still decide which folders are in scope and verify the proposed structure before relying on it.",
    "AI Scheduling Assistant": "Calendar time becomes an execution context with the relevant files and expected result attached, while changes and external actions remain reviewable.",
    FloatIM: "The message thread becomes an entry point to the underlying workspace, so collaborators can see the request, progress, questions, and returned artifact without reconstructing the task elsewhere.",
    "Skills Marketplace": "A Skill packages a repeatable method and its expected output, giving the team a starting point that can still be inspected, changed, and governed for each project.",
    "Multiple AI Models": "The model can change with the stage of work while approved files, instructions, prior decisions, and deliverables remain in the same workspace. Users do not need separate provider API keys for officially available models.",
  },
  zh: {
    "Agent 工作站": "后续追问、修改和周期任务可以继续使用同一上下文，让 Agent 从可检查的项目继续工作，而不是每次打开新对话都重新解释背景。",
    心流模式: "当任务需要通过交流逐渐变清晰时，可以在内容成形过程中持续改向，而不用等到完整初稿生成后再从头修改。",
    "AI 文件整理器": "文件准备会作为单独且可见的步骤执行；哪些文件夹进入范围、采用什么结构以及最终是否接受，仍由用户确认。",
    "AI 日程助理": "日历中的时间块会带上相关文件、任务背景与预期成果，日程变化和对外行动仍然保持可检查、可确认。",
    FloatIM: "消息线程会成为底层工作空间的入口，让协作者直接看到任务、进度、待确认问题和返回成果，不必在其他工具中重新拼接上下文。",
    "Skills Marketplace": "Skill 会封装可复用的方法和预期输出，为团队提供统一起点，同时允许针对每个项目检查、修改和设置治理边界。",
    多模型: "工作不同阶段可以切换适合的模型，而核准文件、任务要求、历史决定和交付物仍保留在同一工作空间。官方上架模型无需用户分别准备供应商 API Key。",
  },
} as const;

function CapabilityVisual({ title, page }: { title: string; page: PersonaPageData }) {
  const isZh = page.locale === "zh";
  const outputs = page.hero.preview.outputs;
  const inputs = page.hero.preview.inputs;
  const shell = (content: React.ReactNode) => <div className="rounded-2xl bg-[#24221f] p-5 text-white"><div className="flex items-center justify-between text-[11px] text-white/40"><span>Floatboat</span><span>{page.hero.preview.matter}</span></div>{content}</div>;

  if (title.includes("Workspace") || title.includes("工作站")) return shell(<div className="mt-6 grid gap-3 sm:grid-cols-[0.72fr_1.28fr]">
    <div className="rounded-xl bg-white/[0.06] p-3"><p className="text-[10px] uppercase tracking-[0.13em] text-white/35">{isZh ? "项目文件" : "Project files"}</p><div className="mt-3 space-y-2">{inputs.map((item) => <p key={item} className="truncate rounded-md bg-white/[0.06] px-2 py-1.5 text-xs text-white/65">▱ {item}</p>)}</div></div>
    <div className="rounded-xl bg-white text-[#1b1a18] p-3"><p className="text-[10px] uppercase tracking-[0.13em] text-black/40">Agent run</p><div className="mt-3 space-y-2"><p className="h-2 w-4/5 rounded bg-black/10" /><p className="h-2 w-3/5 rounded bg-black/10" /></div><div className="mt-5 flex flex-wrap gap-1.5">{outputs.map((item) => <span key={item} className="rounded bg-[#fff5d7] px-2 py-1 text-[10px]">{item}</span>)}</div></div>
  </div>);

  if (title.includes("Flow") || title.includes("心流")) return shell(<div className="mt-6 grid gap-3 sm:grid-cols-[0.62fr_1.38fr]">
    <div className="flex min-h-40 flex-col items-center justify-center rounded-xl bg-white/[0.06]"><div className="flex h-14 items-center gap-1">{[12,28,42,22,50,34,18,38,24].map((height, index) => <span key={index} className="w-1 rounded-full bg-[#f7d68b]" style={{ height }} />)}</div><p className="mt-4 text-[10px] text-white/45">{isZh ? "正在听取并修改" : "Listening and editing"}</p></div>
    <div className="rounded-xl bg-white p-4 text-[#1b1a18]"><p className="text-xs font-semibold">{outputs[0]}</p><div className="mt-4 space-y-2"><p className="h-2 w-full rounded bg-black/10" /><p className="h-2 w-5/6 rounded bg-black/10" /><p className="h-2 w-4/6 rounded bg-[#f7d68b]" /><p className="h-2 w-11/12 rounded bg-black/10" /></div><span className="mt-5 inline-block h-4 w-0.5 bg-[#1b1a18] animate-pulse" /></div>
  </div>);

  if (title.includes("File Organizer") || title.includes("文件整理")) return shell(<div className="mt-6 grid gap-3 sm:grid-cols-2">
    <div className="rounded-xl bg-white/[0.06] p-3"><p className="text-[10px] text-white/35">{isZh ? "整理前" : "Before"}</p>{inputs.map((item, index) => <p key={item} className="mt-2 truncate text-xs text-white/55">□ {index + 1}_{item}_final</p>)}</div>
    <div className="rounded-xl bg-white p-3 text-[#1b1a18]"><p className="text-[10px] text-black/35">{isZh ? "建议结构" : "Suggested structure"}</p>{inputs.map((item) => <p key={item} className="mt-2 truncate rounded bg-[#f0eeeb] px-2 py-1 text-xs">└ {item}</p>)}</div>
  </div>);

  if (title.includes("Scheduling") || title.includes("日程")) return shell(<div className="mt-6 rounded-xl bg-white p-3 text-[#1b1a18]"><div className="grid grid-cols-5 gap-1 text-center text-[9px] text-black/35">{(isZh ? ["一","二","三","四","五"] : ["M","T","W","T","F"]).map((day,index)=><span key={index}>{day}</span>)}</div><div className="mt-2 grid grid-cols-5 gap-1">{Array.from({length:15},(_,index)=><span key={index} className={`min-h-7 rounded ${index===6||index===12?"bg-[#f7d68b]":"bg-[#f0eeeb]"}`} />)}</div><p className="mt-3 rounded-lg bg-[#24221f] px-3 py-2 text-xs text-white">{isZh ? "已准备：" : "Prepared: "}{outputs[0]}</p></div>);

  if (title.includes("FloatIM")) return shell(<div className="mt-6 space-y-3 rounded-xl bg-white/[0.05] p-3"><div className="max-w-[75%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-xs text-[#1b1a18]">{inputs[0]}</div><div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-[#f7d68b] px-3 py-2 text-xs text-[#1b1a18]">Agent · {outputs.join(" · ")}</div><div className="flex gap-2 text-[10px] text-white/40"><span>Human</span><span>→</span><span>Agent</span><span>→</span><span>{isZh ? "团队" : "Team"}</span></div></div>);

  if (title.includes("Skills")) return shell(<div className="mt-6 grid gap-2 sm:grid-cols-3">{page.workflows.items.map((workflow,index)=><div key={workflow.title} className="rounded-xl bg-white p-3 text-[#1b1a18]"><span className="text-[10px] text-black/35">Skill 0{index+1}</span><p className="mt-2 text-xs font-semibold leading-5">{workflow.title}</p><span className="mt-4 inline-block rounded-full bg-[#f7d68b] px-2 py-1 text-[9px]">{isZh ? "可复用" : "Reusable"}</span></div>)}</div>);

  return shell(<div className="mt-6 grid gap-2 sm:grid-cols-2"><div className="rounded-xl bg-white p-3 text-[#1b1a18]"><p className="text-[10px] text-black/35">Auto</p><p className="mt-2 text-sm font-semibold">{isZh ? "自动选择模型" : "Automatic routing"}</p><p className="mt-5 text-[10px] text-black/40">{isZh ? "保留同一工作上下文" : "Same workspace context"}</p></div><div className="space-y-2">{["Claude Opus 4.6","GPT-6 Astra","Gemini 3.1 Pro"].map((model,index)=><p key={model} className={`rounded-lg border px-3 py-2 text-xs ${index===0?"border-[#f7d68b] bg-[#f7d68b] text-[#1b1a18]":"border-white/10 text-white/60"}`}>{model}</p>)}</div></div>);
}

export function PersonaCapabilities({ page, roleLabel }: { page: PersonaPageData; roleLabel: string }) {
  const isZh = page.locale === "zh";
  const items = capabilities[page.slug][page.locale];
  const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);
  const contextualAnchor = (title: string) => {
    if (isZh) {
      if (title === "Agent 工作站") return `能持续保留${roleLabel}项目背景的 Agent 工作站`;
      if (title === "心流模式") return `让${roleLabel}边说边修改成果的心流模式`;
      if (title === "AI 文件整理器") return `在本机整理${roleLabel}资料的 AI 文件整理器`;
      if (title === "AI 日程助理") return `把日程变成${roleLabel}工作入口的 AI 日程助理`;
      if (title === "FloatIM") return `连接${roleLabel}、团队与 Agent 的 FloatIM`;
      if (title === "Skills Marketplace") return `为${roleLabel}提供可复用流程的 Skills Marketplace`;
      return `让${roleLabel}在同一项目切换模型的多模型能力`;
    }
    if (title === "Agent Workspace") return `an Agent Workspace that preserves ${roleLabel} project context`;
    if (title === "Flow Mode") return `Flow Mode for revising ${roleLabel} deliverables while speaking`;
    if (title === "AI File Organizer") return `an AI File Organizer for local ${roleLabel} files`;
    if (title === "AI Scheduling Assistant") return `an AI scheduling assistant that prepares ${roleLabel} work`;
    if (title === "FloatIM") return `FloatIM threads connecting ${roleLabel}, teams, and agents`;
    if (title === "Skills Marketplace") return `reusable ${roleLabel} workflows from the Skills Marketplace`;
    return `multiple AI models inside one ${roleLabel} project`;
  };

  return <section className="border-y border-black/[0.06] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]">{isZh ? "完成工作的能力组合" : "A capability stack for the work"}</p>
        <h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(isZh ? `适合${roleLabel}的 Floatboat 能力` : `Floatboat capabilities for ${roleLabel}`)}</h2>
        <p className="mt-5 text-lg leading-7 text-[var(--ob-color-text-subtle)]">{isZh ? "Work Agent 在持续工作空间中使用这些能力读取资料、执行步骤并交付成果；最终判断和重要行动仍由人控制。" : "The Work Agent uses these capabilities inside a persistent workspace to read context, execute steps, and deliver results. People retain consequential decisions."}</p>
      </div>

      <div className="space-y-16 sm:space-y-24">{items.map(([title, href, description], index) => <article key={title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={index % 2 ? "lg:order-2" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-muted)]">0{index + 1}</p>
          <h3 className="mt-3 font-serif text-3xl sm:text-4xl">{titleCase(title)}</h3>
          <div className="mt-5 max-w-xl space-y-3 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
            <p>{index < 2 ? (isZh ? <><Link href={href} className="font-semibold text-[var(--ob-color-text)] underline decoration-black/20 underline-offset-4 transition hover:decoration-black">{contextualAnchor(title)}</Link>，{description}</> : <><Link href={href} className="font-semibold text-[var(--ob-color-text)] underline decoration-black/20 underline-offset-4 transition hover:decoration-black">{contextualAnchor(title)}</Link> can {lowerFirst(description)}</>) : description}</p>
            <p>{supportingCopy[page.locale][title as keyof typeof supportingCopy[typeof page.locale]]}</p>
          </div>
        </div>
        <div className={`${index % 2 ? "lg:order-1" : ""} rounded-[28px] border border-black/[0.08] bg-[var(--ob-color-surface)] p-5 shadow-[var(--ob-shadow-raised)]`}>
          <CapabilityVisual title={title} page={page} />
        </div>
      </article>)}</div>
    </div>
  </section>;
}
