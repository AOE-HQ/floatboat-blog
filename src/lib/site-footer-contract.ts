import { z } from 'zod';

const labelText = z.string().trim().min(1).max(80);
const label = z.object({ en: labelText, zh: labelText });
const path = z
  .string()
  .max(240)
  .regex(/^\/(?:[a-zA-Z0-9_~-]+(?:\/[a-zA-Z0-9_~-]+)*)?$/);

const link = z.object({
  label,
  path,
  zhPath: path.optional(),
});

export const siteFooterSchema = z
  .object({
    version: z.literal(1),
    groups: z
      .array(
        z.object({
          id: z
            .string()
            .max(32)
            .regex(/^[a-z][a-z0-9-]*$/),
          label,
          links: z.array(link).min(1).max(8),
        })
      )
      .min(1)
      .max(5),
  })
  .refine(
    ({ groups }) =>
      new Set(groups.map((group) => group.id)).size === groups.length,
    'Footer group IDs must be unique'
  )
  .refine(({ groups }) => {
    const links = groups.flatMap((group) => group.links);
    return (['en', 'zh'] as const).every(
      (locale) =>
        new Set(links.map((item) => footerHref(item, locale))).size ===
        links.length
    );
  }, 'Footer paths must be unique within each language');

export type SiteFooterConfig = z.infer<typeof siteFooterSchema>;
export type SiteFooterLocale = 'en' | 'zh';

export function footerHref(
  item: z.infer<typeof link>,
  locale: SiteFooterLocale
) {
  return locale === 'zh'
    ? (item.zhPath ?? `/zh${item.path === '/' ? '' : item.path}`)
    : item.path;
}
