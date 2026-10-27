import Link from "next/link";
import { titleCase } from "@/lib/title-case";

export type CapabilityContext = {
  locale: "en" | "zh";
  preview: { matter: string; inputs: string[]; outputs: string[] };
  workflows: Array<{ title: string }>;
};
export type CapabilityItem = { title: string; href: string; description: string; supporting?: string; anchorText?: string; linkTitle?: boolean };

function CapabilityVisual({ title, context }: { title: string; context: CapabilityContext }) {
  const isZh = context.locale === "zh";
  const outputs = context.preview.outputs;
  const inputs = context.preview.inputs;
  const shell = (content: React.ReactNode) => <div className="rounded-2xl bg-[#24221f] p-5 text-white"><div className="flex items-center justify-between text-[11px] text-white/40"><span>Floatboat</span><span>{context.preview.matter}</span></div>{content}</div>;

  if (title.includes("Workspace") || title.includes("工作站")) return shell(<div className="mt-6 grid gap-3 sm:grid-cols-[0.72fr_1.28fr]">
    <div className="rounded-xl bg-white/[0.06] p-3"><p className="text-[10px] uppercase tracking-[0.13em] text-white/35">{isZh ? "项目文件" : "Project files"}</p><div className="mt-3 space-y-2">{inputs.map((item) => <p key={item} className="truncate rounded-md bg-white/[0.06] px-2 py-1.5 text-xs text-white/65">▱ {item}</p>)}</div></div>
    <div className="rounded-xl bg-white text-[#1b1a18] p-3"><p className="text-[10px] uppercase tracking-[0.13em] text-black/40">Agent run</p><div className="mt-3 space-y-2"><p className="h-2 w-4/5 rounded bg-black/10" /><p className="h-2 w-3/5 rounded bg-black/10" /></div><div className="mt-5 flex flex-wrap gap-1.5">{outputs.map((item) => <span key={item} className="rounded bg-[#fff5d7] px-2 py-1 text-[10px]">{item}</span>)}</div></div>
  </div>);

  if (title.includes("Flow") || title.includes("心流")) return shell(<div className="mt-6 grid gap-3 sm:grid-cols-[0.62fr_1.38fr]">
    <div className="flex min-h-40 flex-col items-center justify-center rounded-xl bg-white/[0.06]"><div className="flex h-14 items-center gap-1">{[12,28,42,22,50,34,18,38,24].map((height, index) => <span key={index} className="w-1 rounded-full bg-[#f7d68b]" style={{ height }} />)}</div><p className="mt-4 text-[10px] text-white/45">{isZh ? "正在听取并修改" : "Listening and editing"}</p></div>
    <div className="rounded-xl bg-white p-4 text-[#1b1a18]"><p className="text-xs font-semibold">{outputs[0]}</p><div className="mt-4 space-y-2"><p className="h-2 w-full rounded bg-black/10" /><p className="h-2 w-5/6 rounded bg-black/10" /><p className="h-2 w-4/6 rounded bg-[#f7d68b]" /><p className="h-2 w-11/12 rounded bg-black/10" /></div><span className="mt-5 inline-block h-4 w-0.5 bg-[#1b1a18] animate-pulse" /></div>
  </div>);

  if (title.includes("File Organizer") || title.includes("文件整理")) return shell(<div className="mt-6 grid gap-3 sm:grid-cols-2">
    <div className="rounded-xl bg-white/[0.06] p-3"><p className="text-[10px] text-white/35">{isZh ? "整理前" : "Before"}</p>{inputs.map((item, index) => <p key={item} className="mt-2 truncate text-xs text-white/55">□ {index + 1}_{item}_final</p>)}</div>
    <div className="rounded-xl bg-white p-3 text-[#1b1a18]"><p className="text-[10px] text-black/35">{isZh ? "建议结构" : "Suggested structure"}</p>{inputs.map((item) => <p key={item} className="mt-2 truncate rounded bg-[#f0eeeb] px-2 py-1 text-xs">└ {item}</p>)}</div>
  </div>);

  if (title.includes("Scheduling") || title.includes("日程")) return shell(<div className="mt-6 rounded-xl bg-white p-3 text-[#1b1a18]"><div className="grid grid-cols-5 gap-1 text-center text-[9px] text-black/35">{(isZh ? ["一","二","三","四","五"] : ["M","T","W","T","F"]).map((day,index)=><span key={index}>{day}</span>)}</div><div className="mt-2 grid grid-cols-5 gap-1">{Array.from({length:15},(_,index)=><span key={index} className={`min-h-7 rounded ${index===6||index===12?"bg-[#f7d68b]":"bg-[#f0eeeb]"}`} />)}</div><p className="mt-3 rounded-lg bg-[#24221f] px-3 py-2 text-xs text-white">{isZh ? "已准备：" : "Prepared: "}{outputs[0]}</p></div>);

  if (title.includes("FloatIM")) return shell(<div className="mt-6 space-y-3 rounded-xl bg-white/[0.05] p-3"><div className="max-w-[75%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-xs text-[#1b1a18]">{inputs[0]}</div><div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-[#f7d68b] px-3 py-2 text-xs text-[#1b1a18]">Agent · {outputs.join(" · ")}</div><div className="flex gap-2 text-[10px] text-white/40"><span>Human</span><span>→</span><span>Agent</span><span>→</span><span>{isZh ? "团队" : "Team"}</span></div></div>);

  if (title.includes("Skills")) return shell(<div className="mt-6 grid gap-2 sm:grid-cols-3">{context.workflows.map((workflow,index)=><div key={workflow.title} className="rounded-xl bg-white p-3 text-[#1b1a18]"><span className="text-[10px] text-black/35">Skill 0{index+1}</span><p className="mt-2 text-xs font-semibold leading-5">{workflow.title}</p><span className="mt-4 inline-block rounded-full bg-[#f7d68b] px-2 py-1 text-[9px]">{isZh ? "可复用" : "Reusable"}</span></div>)}</div>);

  return shell(<div className="mt-6 grid gap-2 sm:grid-cols-2"><div className="rounded-xl bg-white p-3 text-[#1b1a18]"><p className="text-[10px] text-black/35">Auto</p><p className="mt-2 text-sm font-semibold">{isZh ? "自动选择模型" : "Automatic routing"}</p><p className="mt-5 text-[10px] text-black/40">{isZh ? "保留同一工作上下文" : "Same workspace context"}</p></div><div className="space-y-2">{["Claude Opus 4.6","GPT-6 Astra","Gemini 3.1 Pro"].map((model,index)=><p key={model} className={`rounded-lg border px-3 py-2 text-xs ${index===0?"border-[#f7d68b] bg-[#f7d68b] text-[#1b1a18]":"border-white/10 text-white/60"}`}>{model}</p>)}</div></div>);
}


export function CapabilitiesSection({ id, title, description, items, context }: { id?: string; title: string; description: string; items: CapabilityItem[]; context: CapabilityContext }) {
  const isZh = context.locale === "zh";
  const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);
  return <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="border-y border-black/[0.06] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mx-auto mb-16 max-w-3xl text-center">

        <h2 id={id ? `${id}-title` : undefined} className="mt-3 font-serif text-4xl leading-[1.04] tracking-[-0.04em] sm:text-5xl">{titleCase(title)}</h2>
        <p className="mt-5 text-lg leading-7 text-[var(--ob-color-text-subtle)]">{description}</p>
      </div>

      <div className="space-y-16 sm:space-y-24">{items.map(({ title, href, description, supporting, anchorText, linkTitle }, index) => <article key={title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={index % 2 ? "lg:order-2" : ""}>

          <h3 className="mt-3 font-serif text-3xl sm:text-4xl">{linkTitle ? <Link href={href} className="hover:underline underline-offset-4">{titleCase(title)}</Link> : titleCase(title)}</h3>
          <div className="mt-5 max-w-xl space-y-3 text-lg leading-8 text-[var(--ob-color-text-subtle)]">
            <p>{anchorText ? (isZh ? <><Link href={href} className="font-semibold text-[var(--ob-color-text)] underline decoration-black/20 underline-offset-4 transition hover:decoration-black">{anchorText}</Link>，{description}</> : <><Link href={href} className="font-semibold text-[var(--ob-color-text)] underline decoration-black/20 underline-offset-4 transition hover:decoration-black">{anchorText}</Link> can {lowerFirst(description)}</>) : description}</p>
            {supporting && <p>{supporting}</p>}
          </div>
        </div>
        <div className={`${index % 2 ? "lg:order-1" : ""} rounded-[28px] border border-black/[0.08] bg-[var(--ob-color-surface)] p-5 shadow-[var(--ob-shadow-raised)]`}>
          <CapabilityVisual title={title} context={context} />
        </div>
      </article>)}</div>
    </div>
  </section>;
}
