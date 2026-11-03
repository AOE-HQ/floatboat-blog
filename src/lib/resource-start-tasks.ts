import { z } from "zod";
import data from "@/data/resource-start-tasks.json";
import { ALL_FEATURED_SKILLS } from "@/lib/skills/featured-skills";
import { ALL_PROJECTS } from "@/lib/projects/project-pages";

const text = z.string().trim().min(1);
const copy = z.object({ title: text, description: text, inputLabel: text, inputHint: text, outcome: text, example: text.optional() }).strict();
const tasks = z.record(z.object({ en: copy, zh: copy }).strict()).parse(data);
const resources = [...ALL_FEATURED_SKILLS.map((skill) => `${skill.authorHandle}/${skill.slug}`), ...ALL_PROJECTS.map((project) => `${project.author}/${project.slug}`)];
for (const id of resources) if (!tasks[id]) throw new Error(`Missing page-specific conversion task: ${id}`);
for (const id of Object.keys(tasks)) if (!resources.includes(id)) throw new Error(`Conversion task has no resource detail page: ${id}`);
for (const locale of ["en", "zh"] as const) {
  for (const field of ["title", "description", "outcome"] as const) {
    const values = Object.values(tasks).map((task) => task[locale][field]);
    if (new Set(values).size !== values.length) throw new Error(`Duplicate ${locale} conversion ${field}; review task ownership`);
  }
  for (const project of ALL_PROJECTS) if (!tasks[`${project.author}/${project.slug}`][locale].example) throw new Error(`Missing project task example: ${project.name}`);
}

export function getResourceStartTask(id: string, locale: "en" | "zh") {
  const task = tasks[id];
  if (!task) throw new Error(`Unknown resource conversion task: ${id}`);
  return task[locale];
}
