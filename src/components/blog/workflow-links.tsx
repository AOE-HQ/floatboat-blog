import Link from "next/link";

const LINKS = [
  { path: "/agent-workspace", en: { title: "Keep a task in one workspace", body: "Explore how files, tools, run history, and deliverables fit together in an Agent Workspace." }, zh: { title: "把任务留在一个工作空间", body: "了解 Agent Workspace 如何组织文件、工具、执行记录与交付物，再判断它是否适合你的任务。" } },
  { path: "/ai-file-organizer", en: { title: "Start with a folder of files", body: "Review the local-file organization workflow, including how to inspect proposed changes before applying them." }, zh: { title: "从一个待整理文件夹开始", body: "查看本地文件整理的具体工作流，了解如何检查处理方案，再决定是否应用到自己的资料。" } },
  { path: "/ai-scheduling-assistant", en: { title: "Connect a task to your calendar", body: "See how a scheduling assistant relates calendar events to preparation, execution, and follow-up." }, zh: { title: "让日程衔接准备与跟进", body: "了解日程助理如何把日历事件与准备、执行、后续工作联系起来，区分安排时间和完成任务。" } },
] as const;

export function WorkflowLinks({ locale = "en" }: { locale?: "en" | "zh" }) {
  const prefix = locale === "zh" ? "/zh" : "";
  return <section aria-labelledby="workflow-links-heading" className="rounded-3xl bg-[var(--ob-color-surface)] p-6 sm:p-9">
    <h2 id="workflow-links-heading" className="text-2xl font-semibold sm:text-3xl">{locale === "zh" ? "把指南中的方法用到实际任务" : "Take a method into your next task"}</h2>
    <div className="mt-6 grid gap-7 md:grid-cols-3">{LINKS.map(item => <Link key={item.path} href={`${prefix}${item.path}`} className="group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-accent)]"><h3 className="text-lg font-semibold group-hover:underline">{item[locale].title}</h3><p className="mt-2 text-sm leading-7 text-[var(--ob-color-muted)]">{item[locale].body}</p><span className="mt-3 inline-block text-sm">{locale === "zh" ? "查看工作方式 →" : "Explore the workflow →"}</span></Link>)}</div>
  </section>;
}
