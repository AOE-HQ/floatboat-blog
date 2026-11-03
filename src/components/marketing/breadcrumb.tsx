import { Breadcrumbs } from "@openblog/components";

type BreadcrumbItem = { label: string; href: string };

/** Page-data adapter; layout, navigation and schema belong to Breadcrumbs. */
export function Breadcrumb({ items, label = "Breadcrumb" }: { items: BreadcrumbItem[]; label?: string }) {
  return <Breadcrumbs siteUrl="https://floatboat.ai" label={label} items={items.map(({ label: name, href }) => ({ name, href }))} />;
}
