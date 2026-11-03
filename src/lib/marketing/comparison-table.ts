import { z } from "zod";

const text = z.string().trim().min(1);
export const comparisonSchema = z.object({
  title: text,
  description: text,
  columns: z.array(text).min(2),
  rows: z.array(z.object({ label: text, values: z.array(text).min(2) })).min(1),
}).superRefine((table, ctx) => {
  table.rows.forEach((row, index) => {
    if (row.values.length !== table.columns.length) ctx.addIssue({ code: "custom", path: ["rows", index, "values"], message: "Every comparison row must match the column count" });
  });
  if (new Set(table.columns).size !== table.columns.length) ctx.addIssue({ code: "custom", path: ["columns"], message: "Comparison columns must be distinct" });
  if (new Set(table.rows.map(row => row.label)).size !== table.rows.length) ctx.addIssue({ code: "custom", path: ["rows"], message: "Comparison dimensions must be distinct" });
});
export type ComparisonData = z.infer<typeof comparisonSchema>;
