import {
  blogPathForLocale,
  type BlogLocale,
} from "@/config/i18n";

/** Detect blog locale from the current pathname. */
export function getLocaleFromPathname(pathname: string): BlogLocale {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    return "zh";
  }
  return "en";
}

/** Path segment after /blog or /zh/blog, or null if not a blog route. */
function blogRelativePath(pathname: string): string | null {
  const zhMatch = pathname.match(/^\/zh\/blog(\/.*)?$/);
  if (zhMatch) {
    return zhMatch[1] ?? "";
  }

  const enMatch = pathname.match(/^\/blog(\/.*)?$/);
  if (enMatch) {
    return enMatch[1] ?? "";
  }

  return null;
}

/** Same blog page in another locale (Alignify-style path mirroring). */
export function pathForLocale(pathname: string, targetLocale: BlogLocale): string {
  const storeMatch = pathname.match(/^\/(?:zh\/)?(skills-marketplace(?:\/.*)?)$/);
  if (storeMatch) {
    return `${targetLocale === "zh" ? "/zh" : ""}/${storeMatch[1]}`;
  }
  const relative = blogRelativePath(pathname);
  if (relative !== null) {
    return `${blogPathForLocale(targetLocale)}${relative}`;
  }

  const landingMatch = pathname.match(
    /^\/(?:zh\/)?(agent-workspace|floatim|coworker|ai-scheduling-assistant|ai-file-organizer|use-cases(?:\/(?:lawyers|teachers|consultants|researchers|recruiters|financial-analysts|executive-assistants|marketers|for-solopreneur|for-creators|for-small-business|for-studio))?|models(?:\/(?:auto-mode|claude|openai|gemini|deepseek|seedance|kimi|qwen|glm|minimax))?|skills-marketplace\/categories(?:\/(?:coding|development|design-interfaces|writing-marketing|deployment-browser))?|skills-marketplace\/vercel-labs\/find-skills)\/?$/,
  );
  if (landingMatch) {
    return `${targetLocale === "zh" ? "/zh" : ""}/${landingMatch[1]}`;
  }

  return blogPathForLocale(targetLocale);
}
