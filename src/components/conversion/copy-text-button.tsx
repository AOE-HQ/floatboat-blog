"use client";

import { useState } from "react";

export function CopyTextButton({ text, locale, placement, label, disabled = false }: {
  text: string;
  locale: "en" | "zh";
  placement: string;
  label: string;
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState("");
  const [failed, setFailed] = useState("");
  const zh = locale === "zh";
  async function copy() {
    setFailed("");
    try { await navigator.clipboard.writeText(text); setCopied(text); }
    catch { setCopied(""); setFailed(text); }
  }
  return <div>
    <button type="button" onClick={copy} disabled={disabled} data-placement={placement} className="inline-flex min-h-12 items-center justify-center rounded-full border border-current/20 px-5 py-3 text-sm font-semibold transition hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-40">
      {copied === text && text ? (zh ? "已复制" : "Copied") : label}
    </button>
    <p role="status" className="mt-2 min-h-5 text-xs leading-5 opacity-75">
      {failed === text && text ? (zh ? "复制未成功，请手动选择内容复制。" : "Could not copy. Select and copy the text manually.") : copied === text && text ? (zh ? "已复制到剪贴板。" : "Copied to clipboard.") : ""}
    </p>
  </div>;
}
