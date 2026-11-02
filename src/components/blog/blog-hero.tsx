import { Hero } from "@openblog/components";

/** Blog-specific data adapter; category navigation is a separate section. */
export function BlogHero({ locale = "en", title, description, articleCount }: {
  locale?: "en" | "zh";
  title: string;
  description: string;
  articleCount: number;
}) {
  return <Hero layout="centered" title={title} description={description}
    metadata={<p>{locale === "zh" ? `${articleCount} 篇文章` : `${articleCount} articles`}</p>} />;
}
