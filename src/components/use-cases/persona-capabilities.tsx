import { CapabilitiesSection } from "@/components/marketing/capabilities-section";

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

  return <CapabilitiesSection
    id="capabilities"
    title={isZh ? `适合${roleLabel}的 Floatboat 能力` : `Floatboat capabilities for ${roleLabel}`}
    description={page.buildingBlocks.description}
    items={items.map(([title, href, description], index) => ({
      title,
      href,
      description,
      supporting: supportingCopy[page.locale][title as keyof typeof supportingCopy[typeof page.locale]],
      anchorText: index < 2 ? contextualAnchor(title) : undefined,
    }))}
    context={{ locale: page.locale, preview: page.hero.preview, workflows: page.workflows.items }}
  />;
}
