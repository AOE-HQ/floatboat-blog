/** Single catalog for resource request targets; presence does not imply native integration. */
export const RESOURCE_AGENTS = [
  { id: "floatboat", name: "Floatboat", logo: "/blog/brand/floatboat-logo.svg" },
  { id: "claude-code", name: "Claude Code", logo: "/blog/brand/agents/claudecode-color.svg" },
  { id: "codex", name: "Codex CLI", logo: "/blog/brand/agents/codex.svg" },
  { id: "codex-app", name: "Codex App", logo: "/blog/brand/agents/codex.svg" },
  { id: "cursor", name: "Cursor", logo: "/blog/brand/agents/cursor.svg" },
  { id: "gemini-cli", name: "Gemini CLI", logo: "/blog/brand/agents/geminicli-color.svg" },
  { id: "github-copilot", name: "GitHub Copilot", logo: "/blog/brand/agents/githubcopilot.svg" },
  { id: "opencode", name: "OpenCode", logo: "/blog/brand/agents/opencode.svg" },
  { id: "auto", name: "Auto-detect", logo: "" },
] as const;

export type ResourceAgentId = typeof RESOURCE_AGENTS[number]["id"];

export type NativeAgentId = Exclude<ResourceAgentId, "floatboat">;
export const NATIVE_AGENT_IDS = RESOURCE_AGENTS.filter((agent) => agent.id !== "floatboat").map((agent) => agent.id) as [NativeAgentId, ...NativeAgentId[]];
