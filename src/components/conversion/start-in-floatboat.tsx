"use client";

import { useState } from "react";
import Image from "next/image";
import { RESOURCE_AGENTS, type ResourceAgentId } from "@/lib/resource-agents";
import { SkillInstallPanel } from "@/components/skills/skill-install-panel";
import type { SkillInstallation } from "@/lib/skills/featured-skills";
import { CopyTextButton } from "./copy-text-button";

export type StartTaskCopy = {
  title: string;
  description: string;
  inputLabel: string;
  inputHint: string;
  outcome: string;
};

type StartInFloatboatProps = {
  locale: "en" | "zh";
  pageId: string;
  copy: StartTaskCopy;
  initialTask: string;
  nativeInstallation?: { upstreamInstall: string; installation?: SkillInstallation };
} & (
  | { variant: "resource"; resource: { name: string; url: string } }
  | { variant: "task" }
);

/** One resource task and one request, with explicit destinations and verified native setup. */
export function StartInFloatboat(props: StartInFloatboatProps) {
  const { locale, copy, initialTask, pageId, nativeInstallation } = props;
  const [task, setTask] = useState(initialTask);
  const zh = locale === "zh";
  const [agentId, setAgentId] = useState<ResourceAgentId>("floatboat");
  const agent = RESOURCE_AGENTS.find((item) => item.id === agentId)!;
  const floatboat = agentId === "floatboat";
  const agents = RESOURCE_AGENTS.filter((item) => item.id !== "auto" || (nativeInstallation && (!nativeInstallation.installation?.supportedAgents || nativeInstallation.installation.supportedAgents.includes("auto"))));
  const agentName = agentId === "auto" ? (zh ? "所用 Agent" : "your agent") : agent.name;
  const inputId = "floatboat-task-input";
  const ready = task.trim().length > 0;
  const source = props.variant === "resource"
    ? `${zh ? "参考来源" : "Reference"}: ${props.resource.name}\n${props.resource.url}\n\n${zh ? "先阅读原始说明并核对当前环境与依赖。需要安装或连接新工具时，先提出方案。" : "Read the original documentation and check the current environment and dependencies. Propose any new installation or tool connection before proceeding."}\n\n`
    : "";
  const request = ready ? `${source}${zh ? "我的任务" : "My task"}:\n${task.trim()}\n\n${zh ? "期望交付" : "Expected deliverable"}:\n${copy.outcome}` : "";
  const download = `https://floatboat.ai${zh ? "/zh" : ""}/download/success?from=${encodeURIComponent(pageId)}&download_placement=start_in_floatboat`;

  return <section id="start-in-floatboat" data-start-in-floatboat={props.variant} data-resource-id={pageId} data-native-installation={Boolean(nativeInstallation)} aria-labelledby="start-in-floatboat-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-20">
    <div className="rounded-3xl border border-black/[0.09] bg-[var(--ob-color-surface)] p-5 sm:p-7">
      <h2 id="start-in-floatboat-title" className="max-w-3xl font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{copy.title}</h2>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{copy.description}</p>
      <div role="group" aria-label={zh ? "选择使用的 Agent" : "Choose your agent"} className="mt-5 flex flex-wrap gap-2">
        {agents.map((item) => <button key={item.id} type="button" aria-pressed={agentId === item.id} onClick={() => setAgentId(item.id)} data-placement={`resource_agent_${item.id}`} className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 ${agentId === item.id ? "border-[var(--ob-color-text)] bg-white ring-1 ring-[var(--ob-color-text)]" : "border-black/10 hover:border-black/30"}`}>
          {item.logo && <Image unoptimized src={item.logo} alt="" width={item.id === "floatboat" ? 74 : 22} height={22} className={item.id === "floatboat" ? "h-[22px] w-[74px] object-contain" : "size-[22px] object-contain"} />}
          <span className={item.id === "floatboat" ? "sr-only" : undefined}>{item.id === "auto" && zh ? "自动检测" : item.name}</span>
        </button>)}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-7">
        <div className="min-w-0">
          <label htmlFor={inputId} className="block text-sm font-semibold">{copy.inputLabel}</label>
          <p id={`${inputId}-hint`} className="mt-2 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{copy.inputHint}</p>
          <textarea id={inputId} aria-describedby={`${inputId}-hint`} value={task} onChange={(event) => setTask(event.target.value)} maxLength={6000} rows={6} className="mt-4 block w-full resize-y rounded-2xl border border-black/15 bg-white p-4 text-base leading-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ob-color-text)]" />
          <p className="mt-3 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{floatboat ? (zh ? "复制请求，在 Floatboat 新对话中粘贴，并提供所需资料。" : "Copy the request into a new Floatboat conversation and provide the required material.") : (zh ? `复制请求，在 ${agentName} 中粘贴，并提供所需资料与工具权限；请先核对当前版本和环境是否支持此任务。` : `Paste the request into ${agentName} and provide the required material and tool access. Check that its current version and environment support the task.`)}</p>
          {nativeInstallation && agentId !== "floatboat" && <SkillInstallPanel key={agentId} locale={locale} agentId={agentId} {...nativeInstallation} />}
          {floatboat && <a href={download} data-placement="start_in_floatboat_download" className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ob-color-primary)] px-6 py-3 text-sm font-semibold text-[var(--ob-color-text)] transition hover:bg-[var(--ob-color-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4">{zh ? "下载 Floatboat" : "Download Floatboat"} <span aria-hidden="true" className="ml-2">↗</span></a>}
        </div>
        <div className="min-w-0 rounded-2xl bg-[#24221f] p-4 text-white sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-xs">
              <h3 className="text-sm font-semibold">{zh ? `带入 ${agentName} 的请求` : `Your request for ${agentName}`}</h3>
              <p className="mt-2 text-xs leading-6 text-white/65">{zh ? "请求可预览和复制，不会从此处自动发送。" : "Preview and copy the request. It is not sent automatically from this page."}</p>
            </div>
            <CopyTextButton key={agentId} text={request} locale={locale} placement="start_in_floatboat_copy" label={zh ? "复制任务请求" : "Copy task request"} disabled={!ready} />
          </div>
          <pre data-task-preview tabIndex={0} aria-label={zh ? "完整任务请求" : "Full task request"} className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-7 [overflow-wrap:anywhere]">{request || (zh ? "填写任务后，这里会显示完整请求。" : "Describe your task to see the complete request here.")}</pre>
        </div>
      </div>
    </div>
  </section>;
}
