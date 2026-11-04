"use client";

import { ShareRail } from "./share-rail";
import { Toc } from "./toc";

type ArticleSidebarProps = {
  tocItems: { id: string; title: string; level: number }[];
  showToc: boolean;
  showShare: boolean;
  pageUrl: string;
  title: string;
  isZh: boolean;
};

export function ArticleSidebar({
  tocItems,
  showToc,
  showShare,
  pageUrl,
  title,
  isZh,
}: ArticleSidebarProps) {
  if (!showToc && !showShare) {
    return null;
  }

  return (
    <aside className="space-y-10">
      {showToc && tocItems.length > 0 ? (
        <Toc items={tocItems} title={isZh ? "目录" : "On this page"} />
      ) : null}
      {showShare ? (
        <div className="pt-8">
          <ShareRail url={pageUrl} title={title} isZh={isZh} />
        </div>
      ) : null}
    </aside>
  );
}
