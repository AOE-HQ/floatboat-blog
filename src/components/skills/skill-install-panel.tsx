"use client";

import { useState } from "react";
import Image from "next/image";
import { CopyTextButton } from "@/components/conversion/copy-text-button";
import type { SkillInstallation, SkillLocale } from "@/lib/skills/featured-skills";

const AGENTS = [
  { id: "claude-code", name: "Claude Code", logo: "/blog/brand/agents/claudecode-color.svg" },
  { id: "codex", name: "Codex CLI", logo: "/blog/brand/agents/codex.svg" },
  { id: "codex-app", name: "Codex App", logo: "/blog/brand/agents/codex.svg" },
  { id: "cursor", name: "Cursor", logo: "/blog/brand/agents/cursor.svg" },
  { id: "gemini-cli", name: "Gemini CLI", logo: "/blog/brand/agents/geminicli-color.svg" },
  { id: "github-copilot", name: "GitHub Copilot", logo: "/blog/brand/agents/githubcopilot.svg" },
  { id: "opencode", name: "OpenCode", logo: "/blog/brand/agents/opencode.svg" },
  { id: "auto", name: "Auto", logo: "" },
] as const;
type AgentId = typeof AGENTS[number]["id"];

/** Native installation is secondary to the shared Floatboat task conversion. */
export function SkillInstallPanel({ locale, upstreamInstall, installation }: {
  locale: SkillLocale;
  upstreamInstall: string;
  installation?: SkillInstallation;
}) {
  const zh = locale === "zh";
  const availableAgents = AGENTS.filter((item) => {
    if (item.id === "codex-app") return installation?.supportedAgents?.includes("codex-app") ?? false;
    return !installation?.supportedAgents || installation.supportedAgents.includes(item.id);
  });
  const [agentId, setAgentId] = useState<AgentId>(availableAgents[0]?.id ?? "auto");
  const [global, setGlobal] = useState(false);
  const agent = AGENTS.find((item) => item.id === agentId)!;
  const nativeCommand = installation?.commands?.[agentId];
  const context = installation?.contexts?.[agentId] ?? (nativeCommand?.startsWith("/") ? "agent" : "terminal");
  const command = nativeCommand ?? `${upstreamInstall}${agentId !== "auto" ? ` -a ${agentId}` : ""}${global ? " -g" : ""}`;
  const location = context === "app" ? (zh ? `在 ${agent.name} 界面操作` : `Follow these steps in ${agent.name}`)
    : context === "agent" ? (zh ? `在 ${agent.name} 对话中运行` : `Run inside a ${agent.name} conversation`)
    : (zh ? "在终端运行" : "Run in your terminal");

  if (availableAgents.length === 0) return null;
  return <div id="installation">
    <p id="agent-choice-label" className="text-sm font-semibold">{zh ? "选择安装目标" : "Choose an installation target"}</p>
    <div role="group" aria-labelledby="agent-choice-label" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {availableAgents.map((item) => <button key={item.id} type="button" aria-pressed={agentId === item.id} onClick={() => setAgentId(item.id)} data-placement={`skill_install_agent_${item.id}`} className={`flex min-h-20 min-w-0 flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-center text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-4 ${agentId === item.id ? "border-[var(--ob-color-text)] bg-[var(--ob-color-bg)] ring-1 ring-[var(--ob-color-text)]" : "border-black/10 bg-white/40 hover:border-black/30"}`}>
        {item.logo && <Image unoptimized src={item.logo} alt="" width={28} height={28} className="size-7 object-contain" />}
        <span>{item.id === "auto" ? (zh ? "自动检测" : "Auto-detect") : item.name}</span>
      </button>)}
    </div>
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
