import type { ComparisonData } from "@/lib/marketing/comparison-table";

export function ComparisonTable({ caption, dimensionLabel, scrollHint, columns, rows }: Pick<ComparisonData, "columns" | "rows"> & { caption: string; dimensionLabel: string; scrollHint: string }) {
  return <div data-comparison-table>
    <p className="mb-3 text-sm leading-6 text-[var(--ob-color-text-subtle)] lg:hidden">{scrollHint}</p>
    <div role="region" aria-label={caption} tabIndex={0} className="overflow-x-auto rounded-2xl border border-black/10 bg-[var(--ob-color-surface)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
      <table className="w-full border-separate border-spacing-0 text-left text-base leading-7" style={{ minWidth: `${(columns.length + 1) * 220}px` }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-[#24221f] text-white">
            <th scope="col" className="sticky left-0 z-10 min-w-36 bg-[#24221f] px-5 py-5 align-top font-semibold">{dimensionLabel}</th>
            {columns.map(column => <th key={column} scope="col" className="min-w-52 px-5 py-5 align-top font-semibold">{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => <tr key={row.label}>
            <th scope="row" className="sticky left-0 z-10 border-t border-black/10 bg-[var(--ob-color-surface)] px-5 py-5 align-top font-semibold">{row.label}</th>
            {row.values.map((value, index) => <td key={columns[index]} className="border-t border-black/10 px-5 py-5 align-top text-[var(--ob-color-text-subtle)]">{value}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}
