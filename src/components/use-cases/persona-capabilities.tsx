import Link from "next/link";

import capabilities from "@/data/use-cases/capabilities.json";
import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";

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

export function PersonaCapabilities({ page, roleLabel }: { page: PersonaPageData; roleLabel: string }) {
  const isZh = page.locale === "zh";
  const items = capabilities[page.slug][page.locale];
  const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

  return <section className="border-y border-black/[0.06] bg-white/45 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]">{isZh ? "完成工作的能力组合" : "A capability stack for the work"}</p>
        <h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{isZh ? `适合${roleLabel}的 Floatboat 能力` : `Floatboat capabilities for ${roleLabel}`}</h2>
        <p className="mt-5 text-lg leading-7 text-[var(--ob-color-text-subtle)]">{isZh ? "工作站保存上下文，其他能力负责输入、执行、协作与交付。最终判断和重要行动仍由人控制。" : "The workspace holds context while supporting capabilities handle input, execution, collaboration, and delivery. People retain consequential decisions."}</p>
      </div>

      <div className="space-y-16 sm:space-y-24">{items.map(([title, href, description], index) => <article key={title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={index % 2 ? "lg:order-2" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ob-color-muted)]">0{index + 1}</p>
          <h3 className="mt-3 font-serif text-3xl sm:text-4xl">{title}</h3>
          <div className="mt-5 max-w-xl space-y-3 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
            <p>{index < 2 ? (isZh ? <>使用 <Link href={href} className="font-semibold text-[var(--ob-color-text)] underline decoration-black/20 underline-offset-4 transition hover:decoration-black">{title}</Link>，{description}</> : <>Use <Link href={href} className="font-semibold text-[var(--ob-color-text)] underline decoration-black/20 underline-offset-4 transition hover:decoration-black">{title}</Link> to {lowerFirst(description)}</>) : description}</p>
            <p>{supportingCopy[page.locale][title as keyof typeof supportingCopy[typeof page.locale]]}</p>
          </div>
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
