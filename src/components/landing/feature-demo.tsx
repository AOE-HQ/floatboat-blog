"use client";

import { useState } from "react";

import type { CoreFeatureSlug, LandingLocale } from "@/lib/landing/core-feature-pages";

const demoCopy = {
  en: {
    floatim: ["Research the launch", "Draft the announcement", "Prepare the follow-up"],
    coworker: ["Read the project folder", "Build the client brief", "Save the deliverables"],
    "ai-scheduling-assistant": ["Prepare tomorrow's meeting", "Run the weekly report", "Queue the follow-up"],
    "ai-file-organizer": ["Scan Downloads", "Preview the new structure", "Apply approved changes"],
  },
  zh: {
    floatim: ["调研发布信息", "起草公告", "准备后续行动"],
    coworker: ["读取项目文件夹", "生成客户简报", "保存交付物"],
    "ai-scheduling-assistant": ["准备明天的会议", "执行周报任务", "安排后续跟进"],
    "ai-file-organizer": ["扫描下载文件夹", "预览新结构", "执行已批准的变更"],
  },
} as const;

export function FeatureDemo({ slug, locale }: { slug: CoreFeatureSlug; locale: LandingLocale }) {
  const [active, setActive] = useState(0);
  const items = demoCopy[locale][slug];
  const isZh = locale === "zh";

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-[#24221f] text-white shadow-[0_30px_80px_rgba(43,38,31,0.22)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs text-white/55">
        <span>FLOATBOAT WORKSPACE</span>
        <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-emerald-400" />{isZh ? "本地运行" : "Running locally"}</span>
      </div>
      <div className="grid min-h-[360px] md:grid-cols-[220px_1fr]">
        <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
          <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            {isZh ? "任务" : "Work queue"}
          </p>
          <div className="space-y-2">
            {items.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setActive(index)}
                className={`w-full rounded-xl px-3 py-3 text-left text-sm transition ${active === index ? "bg-white text-[#24221f]" : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"}`}
              >
                <span className="mr-2 text-xs opacity-50">0{index + 1}</span>{item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[#f7d68b] font-semibold text-[#24221f]">F</span>
              <div><p className="text-sm font-semibold">Floatboat Agent</p><p className="text-xs text-white/45">{isZh ? "已获得此任务所需权限" : "Approved for this task"}</p></div>
            </div>
            <div className="rounded-2xl bg-white/[0.06] p-5">
              <p className="text-sm leading-7 text-white/78">{items[active]}</p>
              <div className="mt-5 space-y-3">
                {[0, 1, 2].map((line) => <div key={line} className="h-2 rounded-full bg-white/10" style={{ width: `${92 - line * 17}%` }} />)}
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/45">
            <span>{isZh ? "每一步均可检查" : "Every step stays inspectable"}</span>
            <span className="rounded-full bg-[#f7d68b] px-3 py-1.5 font-medium text-[#24221f]">{isZh ? "等待批准" : "Ready for approval"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
