import path from "path";

import {
  createContentService,
  createLocalMdAdapter,
  resolveContentDir,
} from "@openblog/content/local-md";
import { resolveFeatures } from "@openblog/core";

import type { BlogLocale } from "@/config/i18n";
import { config } from "@/lib/openblog-config";

export const CONTENT_DIR = resolveContentDir(
  process.cwd(),
  config.content.options.dir,
);

const features = resolveFeatures(config);

function contentDirForLocale(locale: BlogLocale): string {
  if (locale === "zh") {
    return path.join(CONTENT_DIR, "zh");
  }
  return CONTENT_DIR;
}

const services = new Map<BlogLocale, ReturnType<typeof createContentService>>();

export function getContentService(locale: BlogLocale = "en") {
  let service = services.get(locale);
  if (!service) {
    service = createContentService(
      createLocalMdAdapter({
        contentDir: contentDirForLocale(locale),
        features,
      }),
    );
    services.set(locale, service);
  }
  return service;
}

/** Default English content service (backward compatible). */
export const content = getContentService("en");
