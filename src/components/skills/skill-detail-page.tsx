import { FaqBand } from "@/components/faq-band";
import { RelatedPageLinks } from "@/components/related-page-links";
import { SkillInstallPanel } from "@/components/skills/skill-install-panel";
import { HowSection } from "@/components/marketing/how-section";
import { OverviewSection } from "@/components/marketing/overview-section";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { UseCasesSection } from "@/components/marketing/use-cases-section";
import { skillPath, skillPublisherPath, type FeaturedSkill, type SkillLocale } from "@/lib/skills/featured-skills";

const labels = {
  en: { home: "Home", store: "Skills Marketplace" },
  zh: { home: "首页", store: "Skills 市场" },
} as const;

export function SkillDetailPage({ skill, locale }: { skill: FeaturedSkill; locale: SkillLocale }) {
  const t = labels[locale];
  const isZh = locale === "zh";
  const overview = skill.overview[locale];

  const canonical = `https://floatboat.ai${skillPath(locale, skill.authorHandle, skill.slug)}`;
  const publisherPath = skillPublisherPath(locale, skill.authorHandle);
  const breadcrumbs = [
    { name: t.home, url: `https://floatboat.ai${isZh ? "/zh" : "/"}` },
    { name: t.store, url: `https://floatboat.ai${isZh ? "/zh" : ""}/skills-marketplace` },
    { name: skill.publisher, url: `https://floatboat.ai${publisherPath}` },
    { name: skill.name, url: canonical },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: isZh ? "zh-CN" : "en-US",
    name: skill.seo.title[locale],
    description: skill.seo.description[locale],
    url: canonical,
    about: {
      "@type": "CreativeWork",
      name: skill.name,
      url: skill.sourceUrl,
      creator: { "@type": skill.publisherType, name: skill.publisher },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  };

  return (
    <div className="bg-[var(--ob-color-bg)] text-[var(--ob-color-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Breadcrumb label={isZh ? "面包屑导航" : "Breadcrumb"} items={breadcrumbs.map((item) => ({ label: item.name, href: item.url.startsWith("https://floatboat.ai/skills-marketplace") || item.url.startsWith("https://floatboat.ai/zh/skills-marketplace") ? new URL(item.url).pathname : item.url }))} />

      <MarketingHero title={skill.hero.title[locale]} description={skill.hero.description[locale]} />

      <SkillInstallPanel
        key={`${skill.authorHandle}/${skill.slug}`}
        locale={locale}
        name={skill.name}
        upstreamInstall={skill.upstreamInstall}
        installation={skill.installation}
        sourceUrl={skill.sourceUrl}
        examplePrompt={skill.example.prompt[locale]}
      />

      <OverviewSection
        id="skill-introduction"
        title={overview.title}
        paragraphs={overview.paragraphs}
        identity={{
          name: skill.name,
          typeLabel: "Agent Skill",
          tags: [skill.category[locale], skill.pageCopy.kind[locale]],
        }}
        linksTitle={isZh ? "Skill 来源" : "Skill sources"}
        links={[
          { label: isZh ? `提供方：${skill.publisher}` : `By ${skill.publisher}`, href: publisherPath },
          { label: isZh ? "原始 SKILL.md" : "Original SKILL.md", href: skill.sourceUrl },
          ...(skill.sourceLinks ?? []).map((link) => ({ label: link.label[locale], href: link.href })),
          { label: new URL(skill.repositoryUrl).hostname === "github.com" ? (isZh ? "来源仓库" : "Source repository") : (isZh ? "官方 Skill 目录" : "Official Skill catalog"), href: skill.repositoryUrl },
        ]}
      />

      <UseCasesSection
        title={skill.sectionTitles.useCases[locale]}
        description={skill.sectionTitles.useCasesDescription[locale]}
        items={skill.scenarios.map((item) => ({ label: item.label[locale], title: item.title[locale], description: item.body[locale] }))}
      />

      <HowSection
        title={skill.sectionTitles.how[locale]}
        description={skill.sectionTitles.howDescription[locale]}
        items={skill.steps.map((step) => ({ title: step.title[locale], description: step.body[locale] }))}
      />

      <RelatedPageLinks family="skills" currentId={`${skill.authorHandle}/${skill.slug}`} locale={locale} />

      <FaqBand locale={locale} title={isZh ? `${skill.name} 常见问题` : `${skill.name} FAQ`} items={skill.faq.map((item) => ({ question: item.question[locale], answer: item.answer[locale] }))} />
    </div>
  );
}
