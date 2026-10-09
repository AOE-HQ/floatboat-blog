import type { ModelFamily, ModelLocale } from "@/lib/models/model-pages";
import { localize } from "@/lib/models/model-pages";

export function ModelPickerDemo({ model, locale }: { model: ModelFamily; locale: ModelLocale }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#f5f1e8] shadow-[0_28px_70px_rgba(38,33,27,0.15)]">
      <div className="flex items-center gap-2 border-b border-black/[0.07] bg-white/70 px-5 py-3">
        <span className="size-2.5 rounded-full bg-[#f5a9a4]" />
        <span className="size-2.5 rounded-full bg-[#f4cf77]" />
        <span className="size-2.5 rounded-full bg-[#9ed4ae]" />
        <span className="ml-3 text-xs font-medium text-black/45">Floatboat · {model.name}</span>
      </div>
      <div className="grid min-h-[420px] grid-cols-[92px_1fr] sm:grid-cols-[150px_1fr]">
        <aside className="border-r border-black/[0.07] bg-white/40 p-3">
          <div className="grid size-9 place-items-center rounded-xl bg-[#24221f] font-serif text-sm text-white">F</div>
          <div className="mt-8 space-y-2 text-xs text-black/45">
            <p className="rounded-lg bg-white/80 px-2 py-2 text-black/75">{locale === "zh" ? "新对话" : "New chat"}</p>
            <p className="px-2 py-2">{locale === "zh" ? "文件" : "Files"}</p>
            <p className="px-2 py-2">{locale === "zh" ? "工具" : "Tools"}</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-col p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-black/40">{locale === "zh" ? "当前模型" : "Current model"}</p>
              <h2 className="mt-1 text-xl font-semibold">{model.name}</h2>
            </div>
            <span className="rounded-full border border-black/10 bg-white/65 px-3 py-1 text-xs">{localize(model.badge, locale)}</span>
          </div>
          <div className="my-auto py-8">
            <p className="font-serif text-2xl leading-tight tracking-[-0.03em] sm:text-3xl">
              {locale === "zh" ? "今天想完成什么？" : "What do you want to finish?"}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {model.hero.prompts.map((prompt) => (
                <span key={prompt.en} className="rounded-full border border-black/[0.08] bg-white/70 px-3 py-2 text-xs text-black/60">
                  {localize(prompt, locale)}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-black/[0.09] bg-white px-4 py-3 text-sm text-black/45 shadow-sm">
            {locale === "zh" ? "描述目标，或添加项目文件…" : "Describe the outcome or add project files…"}
          </div>
        </div>
      </div>
    </div>
  );
}
