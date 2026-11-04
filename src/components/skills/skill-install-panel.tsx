"use client";

import { useState } from "react";
import { RESOURCE_AGENTS, type NativeAgentId } from "@/lib/resource-agents";
import { CopyTextButton } from "@/components/conversion/copy-text-button";
import type { SkillInstallation, SkillLocale } from "@/lib/skills/featured-skills";

/** Render verified native setup for the shared selector; never owns another agent list. */
export function SkillInstallPanel({ locale, upstreamInstall, installation, agentId }: {
  locale: SkillLocale;
  agentId: NativeAgentId;
  upstreamInstall: string;
  installation?: SkillInstallation;
}) {
  const zh = locale === "zh";
  const [global, setGlobal] = useState(false);
  const agent = RESOURCE_AGENTS.find((item) => item.id === agentId)!;
  const nativeCommand = installation?.commands?.[agentId];
  const context = installation?.contexts?.[agentId] ?? (nativeCommand?.startsWith("/") ? "agent" : "terminal");
  const command = nativeCommand ?? `${upstreamInstall}${agentId !== "auto" ? ` -a ${agentId}` : ""}${global ? " -g" : ""}`;
  const location = context === "app" ? (zh ? `在 ${agent.name} 界面操作` : `Follow these steps in ${agent.name}`)
    : context === "agent" ? (zh ? `在 ${agent.name} 对话中运行` : `Run inside a ${agent.name} conversation`)
    : (zh ? "在终端运行" : "Run in your terminal");

  if ((installation?.supportedAgents && !installation.supportedAgents.includes(agentId)) || (agentId === "codex-app" && !nativeCommand)) return <p className="mt-3 text-xs leading-6 text-[var(--ob-color-muted)]">{zh ? `本页暂无 ${agent.name} 的已核验安装步骤。可复制任务请求，先核对原始说明与当前环境。` : `This page has no verified native setup for ${agent.name}. Copy the task request to check the original documentation and current environment first.`}</p>;
  return <div id="installation">
    <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-3">
      <h3 className="text-sm font-semibold">{location}</h3>
      {!nativeCommand && <div role="group" aria-label={zh ? "安装范围" : "Installation scope"} className="inline-flex rounded-full border border-black/10 p-1">
        {[false, true].map((scope) => <button key={String(scope)} type="button" aria-pressed={global === scope} onClick={() => setGlobal(scope)} className={`min-h-9 rounded-full px-3 text-xs ${global === scope ? "bg-[var(--ob-color-text)] text-white" : "text-[var(--ob-color-muted)]"}`}>{scope ? (zh ? "全局" : "Global") : (zh ? "当前项目" : "Project")}</button>)}
      </div>}
    </div>
    <div className="rounded-2xl bg-[#24221f] p-5 text-white">
      <pre tabIndex={0} className={`mb-4 overflow-auto whitespace-pre-wrap break-words text-sm leading-7 [overflow-wrap:anywhere] ${context === "app" ? "font-sans" : "font-mono"}`}><code>{command}</code></pre>
      <CopyTextButton text={command} locale={locale} placement="skill_copy_install_command" label={zh ? "复制安装说明" : "Copy installation instructions"} />
    </div>
    {!nativeCommand && <p className="mt-3 text-xs leading-6 text-[var(--ob-color-muted)]">{zh ? `需要 Node.js 22.20+。${global ? "全局安装可供多个项目使用。" : "默认安装到当前项目。"}其他依赖以原始说明为准。` : `Requires Node.js 22.20+. ${global ? "Global installation works across projects." : "Installs to the current project by default."}Check the original instructions for other dependencies.`}</p>}
    {nativeCommand && context === "app" && <p className="mt-3 text-xs leading-6 text-[var(--ob-color-muted)]">{zh ? "以上为应用界面操作步骤，无需粘贴到终端。" : "These are application interface steps, not terminal commands."}</p>}
    {installation && <p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{installation.note[locale]}</p>}
  </div>;
}
