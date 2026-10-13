import type { PersonaPageData } from "@/lib/use-cases/persona-page-schema";
import { titleCase } from "@/lib/title-case";

const burdenOrder: Record<PersonaPageData["slug"], number[]> = {
  lawyers: [0, 1, 2],
  teachers: [0, 2, 3],
  consultants: [0, 1, 2],
  researchers: [0, 1, 3],
  recruiters: [0, 1, 2],
  "financial-analysts": [0, 1, 3],
  "executive-assistants": [0, 1, 2],
  marketers: [0, 1, 3],
  "for-solopreneur": [0, 1, 2],
  "for-creators": [0, 1, 2],
  "for-small-business": [0, 1, 2],
  "for-studio": [0, 1, 2],
};

export function PersonaWorkScenes({ page, roleLabel }: { page: PersonaPageData; roleLabel: string }) {
  const isZh = page.locale === "zh";
  const tasks = [...page.workflows.items.map((item) => item.title), ...page.hero.preview.outputs];

  return <section id="workflows" className="border-y border-black/[0.06] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]">{isZh ? "常见任务与代表场景" : "Common tasks and representative workflows"}</p>
        <h2 className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(isZh ? `${roleLabel}可以交给 Agent 的工作` : `What ${roleLabel} can delegate`)}</h2>
        <p className="mt-5 text-lg leading-7 text-[var(--ob-color-text-subtle)]">{page.burdens.description}</p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl border-y border-black/[0.08] py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <strong className="text-xs uppercase tracking-[0.15em] text-[var(--ob-color-muted)]">{isZh ? "常见任务" : "Common tasks"}</strong>
          {tasks.map((task) => <span key={task} className="before:mr-6 before:text-black/20 before:content-['·'] first:before:hidden">{task}</span>)}
        </div>
      </div>

      <div className="mt-12">{page.workflows.items.map((workflow, index) => {
        const burden = page.burdens.items[burdenOrder[page.slug][index]];
        return <article key={workflow.number} className="grid gap-7 border-t border-black/[0.1] py-12 first:border-t-0 first:pt-4 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--ob-color-muted)]">0{index + 1}</p>
            <h3 className="mt-3 max-w-md font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{titleCase(workflow.title)}</h3>
          </div>
          <div>
            <div className="grid gap-7 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ob-color-muted)]">{isZh ? "面对的问题" : "The problem"}</p>
                <p className="mt-3 font-semibold">{burden.title}</p>
                <p className="mt-2 leading-7 text-[var(--ob-color-text-subtle)]">{burden.description}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ob-color-muted)]">{isZh ? "Agent 可以处理" : "What the agent handles"}</p>
                <p className="mt-3 leading-7 text-[var(--ob-color-text-subtle)]">{workflow.job}</p>
                <p className="mt-3 text-sm leading-6">{workflow.flow.join(isZh ? "、" : " · ")}</p>
              </div>
            </div>
            <div className="mt-7 border border-black/[0.08] border-l-2 border-l-[#1b1a18] bg-[var(--ob-color-surface)] px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">{isZh ? "最终得到" : "Deliverable"}</p>
              <p className="mt-2 leading-7">{workflow.output}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--ob-color-muted)]"><strong className="text-[var(--ob-color-text)]">{isZh ? "人工边界：" : "Human boundary: "}</strong>{workflow.boundary}</p>
          </div>
        </article>;
      })}</div>
    </div>
  </section>;
}
