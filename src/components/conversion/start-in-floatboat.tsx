"use client";

import { useState, type ReactNode } from "react";
import { CopyTextButton } from "./copy-text-button";

export type StartTaskCopy = {
  title: string;
  description: string;
  inputLabel: string;
  inputHint: string;
  outcome: string;
};

type StartInFloatboatProps = {
  locale: "en" | "zh";
  pageId: string;
  copy: StartTaskCopy;
  initialTask: string;
  alternatives?: ReactNode;
} & (
  | { variant: "resource"; resource: { name: string; url: string } }
  | { variant: "task" }
);

/** Convert one concrete page task into a request the visitor can take to Floatboat. */
export function StartInFloatboat(props: StartInFloatboatProps) {
  const { locale, copy, initialTask, pageId, alternatives } = props;
  const [task, setTask] = useState(initialTask);
  const zh = locale === "zh";
  const inputId = "floatboat-task-input";
  const ready = task.trim().length > 0;
  const source = props.variant === "resource"
    ? `${zh ? "参考来源" : "Reference"}: ${props.resource.name}\n${props.resource.url}\n\n${zh ? "先阅读原始说明并核对当前环境与依赖。需要安装或连接新工具时，先提出方案。" : "Read the original documentation and check the current environment and dependencies. Propose any new installation or tool connection before proceeding."}\n\n`
    : "";
  const request = ready ? `${source}${zh ? "我的任务" : "My task"}:\n${task.trim()}\n\n${zh ? "期望交付" : "Expected deliverable"}:\n${copy.outcome}` : "";
  const download = `https://floatboat.ai${zh ? "/zh" : ""}/download/success?from=${encodeURIComponent(pageId)}&download_placement=start_in_floatboat`;

  return <section id="start-in-floatboat" data-start-in-floatboat={props.variant} data-resource-id={pageId} aria-labelledby="start-in-floatboat-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-20">
    <div className="rounded-3xl border border-black/[0.09] bg-[var(--ob-color-surface)] p-6 sm:p-9">
      <h2 id="start-in-floatboat-title" className="max-w-3xl font-serif text-3xl tracking-[-0.035em] sm:text-4xl">{copy.title}</h2>
      <p className="mt-4 max-w-3xl leading-7 text-[var(--ob-color-text-subtle)]">{copy.description}</p>
      <div className="mt-8 grid gap-7 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0">
          <label htmlFor={inputId} className="block text-sm font-semibold">{copy.inputLabel}</label>
          <p id={`${inputId}-hint`} className="mt-2 text-sm leading-6 text-[var(--ob-color-text-subtle)]">{copy.inputHint}</p>
          <textarea id={inputId} aria-describedby={`${inputId}-hint`} value={task} onChange={(event) => setTask(event.target.value)} maxLength={6000} rows={7} className="mt-4 block w-full resize-y rounded-2xl border border-black/15 bg-white p-4 text-base leading-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ob-color-text)]" />
          <p className="mt-4 text-sm leading-7 text-[var(--ob-color-text-subtle)]">{zh ? "编辑任务后复制预览区的请求。下载并打开 Floatboat，在新对话中粘贴请求，再提供任务所需的文件或资料。" : "Edit the task and copy the prepared request. Download and open Floatboat, paste it into a new conversation, then provide the files or material it needs."}</p>
          <a href={download} data-placement="start_in_floatboat_download" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ob-color-primary)] px-6 py-3 text-sm font-semibold text-[var(--ob-color-text)] transition hover:bg-[var(--ob-color-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-4">{zh ? "下载 Floatboat" : "Download Floatboat"} <span aria-hidden="true" className="ml-2">↗</span></a>
        </div>
        <div className="min-w-0 rounded-2xl bg-[#24221f] p-5 text-white sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-xs">
              <h3 className="text-sm font-semibold">{zh ? "带入 Floatboat 的请求" : "Your request for Floatboat"}</h3>
              <p className="mt-2 text-xs leading-6 text-white/65">{zh ? "请求可预览和复制，不会从此处自动发送。" : "Preview and copy the request. It is not sent automatically from this page."}</p>
            </div>
            <CopyTextButton text={request} locale={locale} placement="start_in_floatboat_copy" label={zh ? "复制任务请求" : "Copy task request"} disabled={!ready} />
          </div>
          <pre data-task-preview tabIndex={0} aria-label={zh ? "完整任务请求" : "Full task request"} className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-7 [overflow-wrap:anywhere]">{request || (zh ? "填写任务后，这里会显示完整请求。" : "Describe your task to see the complete request here.")}</pre>
        </div>
      </div>
      {alternatives && <details className="mt-7 border-t border-black/[0.08] pt-5">
        <summary className="w-fit cursor-pointer rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">{zh ? "在其他 Agent 中使用：安装说明" : "Use in another agent: installation instructions"}</summary>
        <div className="mt-6">{alternatives}</div>
      </details>}
    </div>
  </section>;
}
