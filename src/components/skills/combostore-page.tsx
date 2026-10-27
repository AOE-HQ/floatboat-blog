import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import storeCapabilities from "@/data/skills/combostore-capabilities.json";
import { DirectoryTabs } from "@/components/marketing/directory-tabs";

import { getPublisherProfile, PUBLISHER_PROFILE_HANDLES } from "@/lib/skills/publisher-profiles";
import { getPublisherCardCopy } from "@/lib/skills/publisher-card-copy";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { FinalCta } from "@/components/final-cta";
import { FaqBand } from "@/components/faq-band";
import { getStoreCatalog } from "@/lib/skills/skill-categories";
import type { SkillLocale } from "@/lib/skills/featured-skills";

export function comboStoreMetadata(locale: SkillLocale): Metadata {
  const zh = locale === "zh";
  const canonical = `https://floatboat.ai${zh ? "/zh" : ""}/combostore`;
  const title = zh ? "Combo Store — 探索独立项目与 Agent Skills | Floatboat" : "Combo Store — Explore Projects and Agent Skills | Floatboat";
  const description = zh ? "探索编码、设计、写作与自动化中的独立项目与 Agent Skills。从团队和创作者出发，浏览开发、设计、视频与办公协作资源，查看使用指南与原始来源。" : "Discover independent projects and Agent Skills for coding, design, writing, and automation. Meet the publishers and browse development, design, video, and workplace resources with guides and original sources.";
  return { title: { absolute: title }, description, alternates: { canonical, languages: { en: "https://floatboat.ai/combostore", "zh-Hans": "https://floatboat.ai/zh/combostore", "x-default": "https://floatboat.ai/combostore" } }, openGraph: { type: "website", title, description, url: canonical } };
}

export function ComboStorePage({ locale }: { locale: SkillLocale }) {
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
    "answer": "先浏览项目与 Skills 卡片中的用途说明，从开发、界面设计、视频制作或办公协作等任务找到相关条目。也可以先进入提供者页面，集中了解其作品与专长。"
  },
  {
    "question": "哪些 Skill 卡片可以打开？",
    "answer": "只有已经提供本站专门说明的 Skill 卡片可以打开，点击后进入本站详情页。其他 Skills 暂时只展示名称、用途与发布者，不提供跳转；独立项目仍可进入对应项目页面。"
  },
  {
    "question": "目录收录是否意味着项目已安装或可以直接运行？",
    "answer": "不意味着。安装、依赖、账号和权限由具体项目与运行环境决定。执行命令前应阅读原始文档，找到指令文件也不等于装好了配套软件。"
  },
  {
    "question": "怎样确认条目由谁维护？",
    "answer": "进入发布者介绍和原始仓库或网站，查看归属、文档、发布记录及当前问题。发布者卡片帮助识别来源，具体项目是否仍在维护则需要到上游核对。"
  },
  {
    "question": "目录顺序代表热门程度或质量排名吗？",
    "answer": "不代表。目录顺序只是浏览顺序，不是排行榜；本页没有提供经过验证的使用量、评分或安装次数。应按任务、证据和要求选择，不假定排在前面的就是最佳选项。"
  }
] : [
  {
    "question": "What is the difference between a publisher, a project, and a Skill?",
    "answer": "A publisher is the person or organization responsible for the work. A project may be a CLI, library, framework, application, or other resource. A Skill supplies task instructions for an agent. Use the publisher section to understand the source, then inspect the specific item."
  },
  {
    "question": "How should I start when I know the task but not the tool name?",
    "answer": "Browse the project and Skill descriptions for your task, such as development, interface design, video production, or workplace collaboration. You can also open a publisher profile to explore its work and areas of focus together."
  },
  {
    "question": "Which Skill cards can I open?",
    "answer": "Only Skills with a dedicated guide on this site are clickable, and they open that local page. Other Skills display their name, purpose, and publisher without a link. Independent projects still open their project pages."
  },
  {
    "question": "Does a listing mean that a project is installed or ready to run?",
    "answer": "No. Installation, dependencies, accounts, and permissions belong to the individual project and runtime. Check the original documentation before running a command; discovering an instruction file does not install its supporting software."
  },
  {
    "question": "Where can I check who maintains an item?",
    "answer": "Open its publisher profile and original repository or website. Review ownership, documentation, releases, and current issues there. The publisher card identifies the source of the work, while a project’s current maintenance status must be checked upstream."
  },
  {
    "question": "Does the directory order represent popularity or verified quality?",
    "answer": "No. Directory order is a browsing order, not a leaderboard. This page does not supply verified usage, ratings, or install counts. Choose by the task, evidence, and requirements rather than assuming that an earlier card is the best option."
  }
];
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Combo Store", url: `https://floatboat.ai${prefix}/combostore`, inLanguage: zh ? "zh-CN" : "en-US", description: zh ? "探索团队、创作者、软件项目与 Agent Skills" : "Explore teams, creators, software projects, and Agent Skills", mainEntity: { "@type": "ItemList", numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.name, url: entry.entryType === "skill" && !entry.hasLocalGuide ? undefined : entry.href.startsWith("/") ? `https://floatboat.ai${entry.href}` : entry.href })) } };
  return <div className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
    <Breadcrumb label={zh ? "面包屑导航" : "Breadcrumb"} items={[{ label: zh ? "首页" : "Home", href: `https://floatboat.ai${prefix || "/"}` }, { label: zh ? "Combo 商店" : "Combo Store", href: `${prefix}/combostore` }]} />
    <MarketingHero  title="Combo Store" description={zh ? "发现开发、界面设计、视频制作与办公协作中的软件项目和 Agent Skills。先了解背后的团队与创作者，再浏览作品、任务指引和原始来源，为下一项工作找到合适的入口。" : "Discover software projects and Agent Skills for development, interface design, video production, and workplace collaboration. Meet the teams and creators, then explore their work, practical instructions, and original sources for your next task."}>
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-[var(--ob-color-muted)]"><span>{entries.filter((entry) => entry.entryType === "project").length} {zh ? "个独立项目" : "Projects"}</span><span>{entries.filter((entry) => entry.entryType === "skill").length} Skills</span><span>{publisherCount} {zh ? "位发布者" : "Publishers"}</span><span>{guideCount} {zh ? "篇指南" : "Guides"}</span></div>
      <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-[var(--ob-color-muted)]">{zh ? "独立整理的第三方项目与 Skill 目录。每项保留原始来源，安装与兼容性以发布者说明为准。" : "An independent collection of third-party projects and Skills. Check each publisher’s original source for installation and compatibility."}</p>
    </MarketingHero>
    <section id="publishers" aria-labelledby="publishers-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-14 pt-5 sm:px-8 sm:pb-16">
      <div className="mb-7"><h2 id="publishers-title" className="font-serif text-3xl tracking-tight sm:text-4xl">{zh ? "Skills 与项目发布者" : "Teams and Creators Behind the Work"}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ob-color-text-subtle)]">{zh ? "认识发布 Agent Skills、开发工具与独立项目的团队和创作者。从云开发、界面设计到视频制作与办公协作，了解他们的专长、代表作品与原始来源，为下一项任务找到合适的资源。" : "Meet the teams and creators publishing Agent Skills, developer tools, and independent projects. Explore their expertise, representative work, and original sources across cloud development, interface design, video production, and workplace collaboration."}</p></div>
      <DirectoryTabs label={zh ? "发布者类型" : "Publisher type"} tabs={[{ id: "Organization", label: zh ? "团队与组织" : "Teams and Organizations" }, { id: "Person", label: zh ? "创作者" : "Creators" }]} items={publishers.map(({ handle, profile, projectCount, skillCount }) => ({
        id: handle, title: profile.name, description: getPublisherCardCopy(handle)[locale], group: profile.type,
        href: `${prefix}/combostore/${handle}`,
        label: profile.type === "Organization" ? (zh ? "团队 / 组织" : "Organization") : (zh ? "创作者" : "Creator"),
        footer: `${projectCount} ${zh ? "个项目" : "projects"} · ${skillCount} Skills`,
      }))} />
    </section>
    <section id="browse" aria-labelledby="projects-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 sm:px-8">
      <div className="mb-7"><h2 id="projects-title" className="font-serif text-3xl tracking-tight sm:text-4xl">{zh ? "项目与 Skills" : "Projects and Skills"}</h2><p className="mt-3 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{zh ? "从开发工具、云服务和界面设计，到视频制作与办公协作，浏览各个发布者的代表作品与任务指引。" : "Explore tools and instructions across development, cloud services, interface design, video production, and workplace collaboration."}</p></div>
      <DirectoryTabs label={zh ? "内容类型" : "Content type"} tabs={[{ id: "project", label: zh ? "独立项目" : "Projects" }, { id: "skill", label: "Skills" }]} items={entries.map((entry) => ({
        id: entry.id, title: entry.name, description: entry.description, href: entry.entryType === "skill" && !entry.hasLocalGuide ? undefined : entry.href, group: entry.entryType,
        label: entry.kind, footer: entry.publisher,
      }))} />
    </section>
    <CapabilitiesSection id="capabilities" title={capabilityCopy.title} description={capabilityCopy.description} items={capabilityCopy.items} context={{ locale, preview: capabilityCopy.preview, workflows: capabilityCopy.workflows }} />
    <FaqBand locale={locale} items={faq} />
    <FinalCta  title={zh ? "让 Skills 回到真实工作里" : "Give your next task a workspace"} description={zh ? "了解 Floatboat 如何把 Agent、本地文件、工具与交付物放在同一个工作空间。" : "See how Floatboat brings agents, local files, tools, and deliverables into one workspace."} primary={{ label: zh ? "了解 Agent 工作站" : "Meet the Agent Workspace", href: `${prefix}/agent-workspace` }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
  </div>;
}
