"use client";

import { useState } from "react";
import Image from "next/image";

import type { SkillInstallation, SkillLocale } from "@/lib/skills/featured-skills";

const AGENTS = [
  { id: "floatboat", name: "Floatboat", logo: "/blog/brand/floatboat-logo.svg" },
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

function CopyIcon({ done }: { done: boolean }) {
  return <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{done ? <path d="m5 12 4 4L19 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" /></>}</svg>;
}

export function SkillInstallPanel({ locale, name, upstreamInstall, installation, sourceUrl, examplePrompt }: {
  locale: SkillLocale;
  name: string;
  upstreamInstall: string;
  installation?: SkillInstallation;
  sourceUrl: string;
  examplePrompt: string;
}) {
  const zh = locale === "zh";
  const [agentId, setAgentId] = useState<AgentId>("floatboat");
  const [global, setGlobal] = useState(false);
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState(false);
  const availableAgents = AGENTS.filter((item) => {
    if (item.id === "floatboat") return true;
    if (item.id === "codex-app") return installation?.supportedAgents?.includes("codex-app") ?? false;
    return !installation?.supportedAgents || installation.supportedAgents.includes(item.id);
  });
  const agent = AGENTS.find((item) => item.id === agentId)!;
  const floatboat = agentId === "floatboat";
  const nativeCommand = agentId === "floatboat" ? undefined : installation?.commands?.[agentId];
  const nativeContext = agentId === "floatboat" ? undefined : installation?.contexts?.[agentId] ?? (nativeCommand?.startsWith("/") ? "agent" : "terminal");
  const nativeLocation = nativeContext === "app"
    ? (zh ? `在 ${agent.name} 界面操作` : `Follow these steps in ${agent.name}`)
    : nativeContext === "agent"
      ? (zh ? `在 ${agent.name} 对话中运行` : `Run inside a ${agent.name} conversation`)
      : (zh ? "在终端运行" : "Run in your terminal");
  const command = nativeCommand ?? `${upstreamInstall}${agentId !== "auto" && !floatboat ? ` -a ${agentId}` : ""}${global ? " -g" : ""}`;
  const request = zh
    ? `请阅读 ${sourceUrl} 中的 ${name} 原始说明，介绍它的用途、所需工具和安装方式，再协助我使用。`
    : `Read the original ${name} instructions at ${sourceUrl}. Explain its purpose, required tools, and installation options, then help me use it.`;
  const value = floatboat ? request : command;
  async function copy(text: string) {
    setCopyError(false);
    try { await navigator.clipboard.writeText(text); setCopied(text); }
    catch { setCopied(""); setCopyError(true); }
  }
  function select(id: AgentId) { setAgentId(id); setCopied(""); setCopyError(false); }

  return <section id="installation" aria-labelledby="installation-title" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
    <div className="rounded-3xl border border-black/[0.09] bg-[var(--ob-color-surface)] p-6 sm:p-9">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><h2 id="installation-title" className="font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{zh ? "安装与快速上手" : "Install and get started"}</h2><p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{zh ? "选择你使用的 Agent，查看对应的安装或使用方式。在 Floatboat 中，可复制请求让 Agent 读取原始说明；其他选项会显示该 Skill 的安装命令或发布者提供的原生步骤。" : "Choose your agent to see how to get started. In Floatboat, copy a request that asks the agent to read the original instructions. Other options show the Skill installation command or the publisher’s native setup steps."}</p></div></div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        <div className="min-w-0 lg:order-2">
          <p id="agent-choice-label" className="mb-3 text-sm font-semibold">{zh ? "选择 Agent" : "Choose an agent"}</p>
          <div role="group" aria-labelledby="agent-choice-label" className={`grid grid-cols-2 gap-2 lg:grid-cols-2 ${availableAgents.length > 2 ? "sm:grid-cols-4 xl:grid-cols-4" : ""}`}>
            {availableAgents.map((item) => <button key={item.id} type="button" aria-pressed={agentId === item.id} onClick={() => select(item.id)} data-placement={`skill_install_agent_${item.id}`} className={`flex min-h-24 min-w-0 flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-center text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ob-color-text)] ${agentId === item.id ? "border-[var(--ob-color-text)] bg-[var(--ob-color-bg)] ring-1 ring-[var(--ob-color-text)]" : "border-black/[0.09] bg-white/40 hover:border-black/30"}`}>
              {item.id === "floatboat" ? <><span className="flex h-8 items-center"><Image unoptimized src={item.logo} alt="" width="110" height="33" className="h-auto w-[92px] max-w-full" /></span><span className="sr-only">Floatboat</span><span className="text-[10px] text-[var(--ob-color-muted)]">{zh ? "在工作站中使用" : "Use in workspace"}</span></> : item.logo ? <><Image unoptimized src={item.logo} alt="" width="28" height="28" className="size-7 object-contain" /><span>{item.name}</span></> : <><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></svg><span>{zh ? "自动检测" : "Auto-detect"}</span></>}
            </button>)}
          </div>

        </div>
        <div className="min-w-0 lg:order-1" aria-live="polite">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><h3 className="text-sm font-semibold">{floatboat ? (zh ? "在 Floatboat 中开始" : "Start in Floatboat") : (zh ? `安装到 ${agentId === "auto" ? "你的 Agent" : agent.name}` : `Install for ${agentId === "auto" ? "your agent" : agent.name}`)}</h3>{!floatboat && !nativeCommand && <div role="group" aria-label={zh ? "安装范围" : "Installation scope"} className="inline-flex rounded-full border border-black/10 p-1">{[false, true].map((scope) => <button key={String(scope)} type="button" aria-pressed={global === scope} onClick={() => { setGlobal(scope); setCopied(""); setCopyError(false); }} className={`min-h-8 rounded-full px-3 text-xs ${global === scope ? "bg-[var(--ob-color-text)] text-white" : "text-[var(--ob-color-muted)]"}`}>{scope ? (zh ? "全局" : "Global") : (zh ? "当前项目" : "Project")}</button>)}</div>}</div>
          <div className="rounded-2xl bg-[#24221f] p-5 text-white"><p className="mb-3 text-xs text-white/55">{floatboat ? (zh ? "复制请求，粘贴到 Floatboat 对话" : "Copy the request into a Floatboat conversation") : nativeCommand ? nativeLocation : (zh ? "在终端运行" : "Run in your terminal")}</p><pre tabIndex={0} className={`overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7 ${floatboat || nativeContext === "app" ? "font-sans" : "font-mono"}`}><code>{value}</code></pre><button type="button" onClick={() => copy(value)} data-placement={floatboat ? "skill_copy_floatboat_request" : "skill_copy_install_command"} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-[#24221f] transition hover:bg-white/85"><CopyIcon done={copied === value} />{copied === value ? (zh ? "已复制" : "Copied") : floatboat ? (zh ? "复制使用请求" : "Copy request") : nativeCommand ? (nativeContext === "app" ? (zh ? "复制操作步骤" : "Copy setup steps") : (zh ? "复制安装说明" : "Copy instructions")) : (zh ? "复制安装命令" : "Copy command")}</button></div>
          {(!nativeCommand || nativeContext === "app") && <p className="mt-3 text-xs leading-6 text-[var(--ob-color-muted)]">{floatboat ? (zh ? "由 Agent 读取原始说明，再确认当前环境的使用方式。" : "Let the agent read the original instructions and check how to use them in your environment.") : nativeCommand ? (nativeContext === "app" ? (zh ? "这是应用界面中的操作步骤，无需粘贴到终端。" : "These are application navigation steps, not terminal commands.") : nativeLocation) : (zh ? `需要 Node.js 22.20+。${global ? "全局安装可供多个项目使用。" : "默认安装到当前项目。"}具体工具要求以该 Skill 原始说明为准。` : `Requires Node.js 22.20+. ${global ? "Global installation works across projects." : "Installs to the current project by default."}Check the Skill source for tool requirements.`)}</p>}
          {installation && !floatboat && <p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{installation.note[locale]}</p>}
          {floatboat && <a href={`https://floatboat.ai${zh ? "/zh" : ""}/download/success?from=skill-${encodeURIComponent(name)}&download_placement=skill_install`} data-placement="skill_install_download_floatboat" className="mt-3 inline-flex min-h-11 items-center rounded-full bg-[var(--ob-color-primary)] px-5 text-sm font-semibold text-[var(--ob-color-text)]">{zh ? "下载 Floatboat" : "Download Floatboat"} ↗</a>}
          <p role="status" className="mt-2 text-xs text-[var(--ob-color-muted)]">{copyError ? (zh ? "复制未成功，请手动选择上方文字复制。" : "Could not copy. Select and copy the text above.") : copied ? (zh ? "已复制到剪贴板" : "Copied to clipboard") : ""}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 border-t border-black/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-3xl"><h3 className="text-sm font-semibold">{zh ? "试试这样提问" : "Try this request"}</h3><p className="mt-2 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{examplePrompt}</p></div><button type="button" onClick={() => copy(examplePrompt)} data-placement="skill_copy_example" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-black/15 px-5 text-xs font-semibold"><CopyIcon done={copied === examplePrompt} />{copied === examplePrompt ? (zh ? "已复制" : "Copied") : (zh ? "复制示例" : "Copy example")}</button></div>
    </div>
  </section>;
}
