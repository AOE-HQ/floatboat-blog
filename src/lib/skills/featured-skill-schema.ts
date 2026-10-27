import { z } from "zod";

const text = z.string().trim().min(1);
const url = text.url().regex(/^https?:\/\//);
const localized = z.object({ en: text, zh: text });
const agent = z.enum(["claude-code", "codex", "codex-app", "cursor", "gemini-cli", "github-copilot", "opencode", "auto"]);

export const skillInstallationSchema = z.object({
  supportedAgents: z.array(agent).optional(),
  note: localized,
  commands: z.record(agent, text).optional(),
  contexts: z.record(agent, z.enum(["terminal", "agent", "app"])).optional(),
});

export type SkillInstallation = z.infer<typeof skillInstallationSchema>;

const skill = z.object({
  slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  authorHandle: text.regex(/^[a-z0-9.-]+$/),
  name: text,
  publisher: text,
  publisherType: z.enum(["Organization", "Person"]),
  sourceUrl: url,
  repositoryUrl: url,
  sourceLinks: z.array(z.object({ label: localized, href: url })).optional(),
  category: localized,
  seo: z.object({ title: localized, description: localized, keywords: z.object({ en: z.array(text).min(1), zh: z.array(text).min(1) }) }),
  hero: z.object({ eyebrow: z.object({ en: z.string(), zh: z.string() }), title: localized, description: localized }),
  overview: z.object({
    en: z.object({ title: text, paragraphs: z.array(text).length(1) }),
    zh: z.object({ title: text, paragraphs: z.array(text).length(1) }),
  }),
  summary: localized,
  cardDescription: localized.optional(),
  upstreamInstall: text,
  installation: skillInstallationSchema.optional(),
  pageCopy: z.object({ kind: localized }),
  sectionTitles: z.object({
    useCases: localized,
    useCasesDescription: localized,
    how: z.object({ en: text.startsWith("How to"), zh: text.startsWith("如何") }),
    howDescription: localized,
  }),
  scenarios: z.array(z.object({ label: localized, title: localized, body: localized })).length(3),
  example: z.object({ prompt: localized }),
  steps: z.array(z.object({ title: localized, body: localized })).length(3),
  faq: z.array(z.object({ question: localized, answer: localized })).min(6),
}).superRefine((entry, ctx) => {
  for (const locale of ["en", "zh"] as const) {
    const questions = entry.faq.map((item) => item.question[locale]);
    if (new Set(questions).size !== questions.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["faq"], message: `Duplicate ${locale} FAQ question` });
  }
  const installation = entry.installation;
  if (installation?.supportedAgents && new Set(installation.supportedAgents).size !== installation.supportedAgents.length) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["installation", "supportedAgents"], message: "Agent options must be distinct" });
  }
  if (installation?.supportedAgents?.includes("codex-app") && !installation.commands?.["codex-app"]) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["installation", "commands", "codex-app"], message: "Codex App requires its explicit interface setup steps" });
  }
  if (installation?.commands && installation.supportedAgents) {
    for (const id of installation.supportedAgents) {
      if (!installation.commands[id]) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["installation", "commands", id], message: "Listed agent requires its native installation instructions" });
    }
  }
});

export const featuredSkillsSchema = z.array(skill).superRefine((entries, ctx) => {
  const ids = entries.map((entry) => `${entry.authorHandle}/${entry.slug}`);
  if (new Set(ids).size !== ids.length) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Skill routes must be unique" });
});
