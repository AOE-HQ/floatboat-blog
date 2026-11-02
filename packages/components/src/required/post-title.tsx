import { HeroTitle } from "./hero";

export function PostTitle({ children }: { children: string }) {
  return <HeroTitle>{children}</HeroTitle>;
}
