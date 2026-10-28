import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import storeCapabilities from "@/data/skills/skills-marketplace-capabilities.json";
import { DirectoryTabs } from "@/components/marketing/directory-tabs";

import { getPublisherProfile, PUBLISHER_PROFILE_HANDLES } from "@/lib/skills/publisher-profiles";
import { getPublisherCardCopy } from "@/lib/skills/publisher-card-copy";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { FinalCta } from "@/components/final-cta";
import { FaqBand } from "@/components/faq-band";
import { getStoreCatalog } from "@/lib/skills/skill-categories";
import type { SkillLocale } from "@/lib/skills/featured-skills";

export function skillsMarketplaceMetadata(locale: SkillLocale): Metadata {
  const zh = locale === "zh";
  const canonical = `https://floatboat.ai${zh ? "/zh" : ""}/skills-marketplace`;
  const title = zh ? "Skills 市场 — Agent 工具、独立项目与 Skills | Floatboat" : "Skills Marketplace — Agent Tools, Projects, and Skills | Floatboat";
  const description = zh ? "探索编程 Agent、Agent Harness、独立软件与 Agent Skills。认识 OpenAI、DeepSeek、Moonshot AI 等发布者，比较项目用途、使用条件与原始来源。" : "Explore coding agents, agent harnesses, independent software, and Agent Skills. Meet their publishers and compare project capabilities, requirements, guides, and official sources.";
  return { title: { absolute: title }, description, alternates: { canonical, languages: { en: "https://floatboat.ai/skills-marketplace", "zh-Hans": "https://floatboat.ai/zh/skills-marketplace", "x-default": "https://floatboat.ai/skills-marketplace" } }, openGraph: { type: "website", title, description, url: canonical } };
}

export function SkillsMarketplacePage({ locale }: { locale: SkillLocale }) {
  const zh = locale === "zh";
  const capabilityCopy = storeCapabilities[locale];
  const entries = getStoreCatalog(locale);
  const publishers = PUBLISHER_PROFILE_HANDLES.map((handle) => {
    const profile = getPublisherProfile(handle)!;
    return { handle, profile, projectCount: profile.projects.length, skillCount: entries.filter((entry) => entry.authorHandle === handle && entry.entryType === "skill").length };
  });
  const publisherCount = publishers.length;
  const guideCount = entries.filter((entry) => entry.hasLocalGuide).length;
  const prefix = zh ? "/zh" : "";
  const faq = zh ? [
  {
    "question": "发布者、项目和 Skill 有什么区别？",
    "answer": "发布者是负责这些作品的个人或组织；项目可以是 CLI、库、框架、应用或其他资源；Skill 则为 Agent 提供任务指引。可以先通过发布者了解来源，再查看具体条目。"
  },
  {
    "question": "知道任务但不知道工具名称时，怎样开始找？",
    "answer": "先确定要改进的环节：任务拆分、工具连接、上下文、记忆或结果验证。再阅读项目介绍中的可借鉴机制与适用场景；进入发布者页核对来源，切换 Skills 查找可复用任务说明。"
  },
  {
    "question": "哪些 Skill 卡片可以打开？",
    "answer": "只有已有本站指南的 Skill 才能打开，其他 Skill 卡片保持不可点击。独立项目已有本站介绍时进入项目详情；其他项目保留官网或仓库入口。项目详情会区分核心能力、使用条件与官方来源。"
  },
  {
    "question": "项目开源是否意味着模型和服务也免费？",
    "answer": "不意味着。源码许可与模型 API、订阅、云服务及第三方组件是不同问题。Agent 或 Harness 开源，不代表包含免费模型额度，也不代表已经安装或获得了外部工具权限。"
  },
  {
    "question": "怎样确认条目由谁维护？",
    "answer": "进入发布者介绍和原始仓库或网站，查看归属、文档、发布记录及当前问题。发布者卡片帮助识别来源，具体项目是否仍在维护则需要到上游核对。"
  },
  {
    "question": "目录顺序代表热门程度或质量排名吗？",
    "answer": "不代表。目录优先呈现已有本站详情的独立项目，方便比较工作流机制与边界；这不是热度榜或质量排名。仓库 stars、使用量和安装量各有不同口径，应结合实际来源、维护状态与任务需求判断。"
  }
] : [
  {
    "question": "What is the difference between a publisher, a project, and a Skill?",
    "answer": "A publisher is the person or organization responsible for the work. A project may be a CLI, library, framework, application, or other resource. A Skill supplies task instructions for an agent. Use the publisher section to understand the source, then inspect the specific item."
  },
  {
    "question": "How should I start when I know the task but not the tool name?",
    "answer": "Identify the stage you want to improve: task structure, tool connections, context, memory, or result verification. Read the project guide for mechanisms and examples, check the publisher for provenance, and switch to Skills for reusable instructions."
  },
  {
    "question": "Which Skill cards can I open?",
    "answer": "Only Skills with a dedicated local guide are clickable. Independent projects with a local introduction open that detail page; other projects retain a website or repository link. Project guides separate capabilities, requirements, and official sources."
  },
  {
    "question": "Does open-source software include free models and services?",
    "answer": "No. Source licensing is separate from model APIs, subscriptions, cloud services, and third-party components. An open agent or harness does not include free model credits, an installed runtime, or permission to access external systems."
  },
  {
    "question": "Where can I check who maintains an item?",
    "answer": "Open its publisher profile and original repository or website. Review ownership, documentation, releases, and current issues there. The publisher card identifies the source of the work, while a project’s current maintenance status must be checked upstream."
  },
  {
    "question": "Does the directory order represent popularity or verified quality?",
    "answer": "No. Independent projects with local detail pages appear first to support workflow comparison; that is not a popularity or quality ranking. Repository stars, usage, and installation counts measure different things. Choose by source, maintenance, and task requirements."
  }
];
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: zh ? "Skills 市场" : "Skills Marketplace", url: `https://floatboat.ai${prefix}/skills-marketplace`, inLanguage: zh ? "zh-CN" : "en-US", description: zh ? "探索团队、创作者、软件项目与 Agent Skills" : "Explore teams, creators, software projects, and Agent Skills", mainEntity: { "@type": "ItemList", numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.name, url: entry.entryType === "skill" && !entry.hasLocalGuide ? undefined : entry.href.startsWith("/") ? `https://floatboat.ai${entry.href}` : entry.href })) } };
  return <div className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb label={zh ? "面包屑导航" : "Breadcrumb"} items={[{ label: zh ? "首页" : "Home", href: `https://floatboat.ai${prefix || "/"}` }, { label: zh ? "Skills 市场" : "Skills Marketplace", href: `${prefix}/skills-marketplace` }]} />
    <MarketingHero  title={zh ? "Skills 市场" : "Skills Marketplace"} description={zh ? "为自己的 Agent 工作流寻找可借鉴的开源项目与 Skills。从任务拆分、工具连接到上下文和结果审阅，了解组织与创作者的代表作品，选择适合在 Floatboat 中研究和验证的工作方法。" : "Find open-source projects and Skills to help design your own agent workflows. Explore task structure, tool connections, context, and result review through representative work from organizations and creators, then plan a focused experiment around your work in Floatboat."}>
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-[var(--ob-color-muted)]"><span>{entries.filter((entry) => entry.entryType === "project").length} {zh ? "个独立项目" : "Projects"}</span><span>{entries.filter((entry) => entry.entryType === "skill").length} Skills</span><span>{publisherCount} {zh ? "位发布者" : "Publishers"}</span><span>{guideCount} {zh ? "篇指南" : "Guides"}</span></div>
      <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-[var(--ob-color-muted)]">{zh ? "项目与 Skills 用于工作流研究和设计参考；具体接入、运行与兼容性以实际环境和发布者说明为准。" : "Projects and Skills are references for workflow design. Validate any integration, runtime, and compatibility requirements against your environment and the upstream documentation."}</p>
    </MarketingHero>
    <section id="publishers" aria-labelledby="publishers-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-14 pt-5 sm:px-8 sm:pb-16">
      <div className="mb-7"><h2 id="publishers-title" className="font-serif text-3xl tracking-tight sm:text-4xl">{zh ? "项目与 Skills 的发布者" : "Teams and Creators Behind the Work"}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-text-subtle)]">{zh ? "认识开发编程 Agent、运行框架、创作工具与 Skills 的组织和创作者。了解各自的方向、代表作品和维护来源，再选择适合开发、设计、视频与办公任务的项目。" : "Meet the organizations and creators building coding agents, runtimes, creative tools, and Skills. Explore their focus, representative projects, and maintained sources before choosing resources for development, design, video, or office work."}</p></div>
      <DirectoryTabs label={zh ? "发布者类型" : "Publisher type"} tabs={[{ id: "Organization", label: zh ? "团队与组织" : "Teams and Organizations" }, { id: "Person", label: zh ? "创作者" : "Creators" }]} items={publishers.map(({ handle, profile, projectCount, skillCount }) => ({
        id: handle, title: profile.name, description: getPublisherCardCopy(handle)[locale], group: profile.type,
        href: `${prefix}/skills-marketplace/${handle}`,
        label: profile.type === "Organization" ? (zh ? "团队 / 组织" : "Organization") : (zh ? "创作者" : "Creator"),
        footer: `${projectCount} ${zh ? "个项目" : "projects"} · ${skillCount} Skills`,
      }))} />
    </section>
    <section id="browse" aria-labelledby="projects-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 sm:px-8">
      <div className="mb-7"><h2 id="projects-title" className="font-serif text-3xl tracking-tight sm:text-4xl">{zh ? "项目与 Skills" : "Projects and Skills"}</h2><p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{zh ? "借鉴 Codex、DeepSeek Harness、Pi、OpenCode、Hermes Agent、Kimi Code CLI 与 ZCode 的运行机制，构建或优化自己的工作流；切换 Skills 查看可复用任务指引。" : "Study workflow mechanisms in Codex, DeepSeek Harness, Pi, OpenCode, Hermes Agent, Kimi Code CLI, and ZCode. Use the references to build or improve your own workflows, or switch to Skills for reusable task instructions."}</p></div>
      <DirectoryTabs label={zh ? "内容类型" : "Content type"} tabs={[{ id: "project", label: zh ? "独立项目" : "Projects" }, { id: "skill", label: "Skills" }]} items={entries.map((entry) => ({
        id: entry.id, title: entry.name, description: entry.description, href: entry.entryType === "skill" && !entry.hasLocalGuide ? undefined : entry.href, group: entry.entryType,
        label: entry.kind, footer: entry.publisher,
      }))} />
    </section>
    <CapabilitiesSection id="capabilities" title={capabilityCopy.title} description={capabilityCopy.description} items={capabilityCopy.items} context={{ locale, preview: capabilityCopy.preview, workflows: capabilityCopy.workflows }} />
    <FaqBand locale={locale} items={faq} />
    <FinalCta  title={zh ? "在 Floatboat 中验证自己的工作流" : "Give Your Workflow a Workspace"} description={zh ? "围绕自己的资料、工具和交付目标，在 Floatboat 的持续工作空间中组织任务、审阅结果，并逐步改进可复用的工作方法。" : "See how Floatboat brings agents, local files, tools, and deliverables into one workspace."} primary={{ label: zh ? "了解 Agent 工作站" : "Meet the Agent Workspace", href: `${prefix}/agent-workspace` }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </div>;
}
