import Link from "next/link";

import type { SkillLocale } from "@/lib/skills/featured-skills";
import { PUBLISHER_HANDLES, getPublisherDirectory, publisherDirectoryPath } from "@/lib/skills/publisher-directories";

const publishers = [
  { handle: "vercel-labs", name: "Vercel Labs" },
  { handle: "morluto", name: "morluto" },
  ...PUBLISHER_HANDLES.map((handle) => ({ handle, name: getPublisherDirectory(handle)!.name })),
];

export function PublisherDirectoryNav({ locale, current }: { locale: SkillLocale; current: string }) {
  return (
    <nav aria-label={locale === "zh" ? "浏览其他 Skill 发布者" : "Browse other Skill publishers"} className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl border-t border-black/[0.08] pt-8">
        <h2 className="font-serif text-2xl tracking-tight">{locale === "zh" ? "浏览其他发布者" : "Explore Other Publishers"}</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {publishers.map(({ handle, name }) => <Link key={handle} href={publisherDirectoryPath(locale, handle)} aria-current={handle === current ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${handle === current ? "border-[var(--ob-color-text)] bg-[var(--ob-color-text)] text-white" : "border-black/10 bg-white/60 hover:bg-white"}`}>{name}</Link>)}
        </div>
      </div>
    </nav>
  );
}
