import { Hero, type HeroProps } from "@openblog/components";

/** Marketing adapter: all visual rules live in the shared Hero. */
export function MarketingHero(props: HeroProps) {
  return <Hero {...props} />;
}
