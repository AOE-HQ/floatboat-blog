import { HeroDescription } from "./hero";

export function PostDek({ children }: { children: string }) {
  return <HeroDescription>{children}</HeroDescription>;
}
