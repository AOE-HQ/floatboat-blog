<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Floatboat Blog

Independent OpenBlog app mounted at `https://floatboat.ai/blog`. Cloudflare / Ingress rewrites `/blog/*` and `/zh/blog/*` to this service. Anything else on `floatboat.ai` still hits `aoe-backend`.

## Images

Script: `scripts/convert-blog-images-to-webp.mjs`

Put article images in `public/blog/images/<slug>/`. The public URL must start with `/blog/images/` so Cloudflare / Ingress sends it to this pod. Rasters must be **WebP**. Keep SVG as SVG (logo: `/blog/brand/floatboat-logo.svg`). Do not use Next `/_next/image` (that hits aoe-backend and 400s). Do not put files at `/brand/...` or `/favicon.ico` on this app; those go to the main site.

### Convert a new post

1. Drop `.png` / `.jpg` / `.jpeg` into `public/blog/images/<slug>/`.
2. Write Markdown with either the current filename or the `.webp` name:

```yaml
cover: "/blog/images/my-slug/hero.png"
```

```md
![alt](/blog/images/my-slug/hero.png)
```

3. From the repo root:

```bash
npm run images:webp
```

This uses sharp, quality 80, **original pixel size** (no resize). It writes `.webp` next to the source, deletes the png/jpeg, and rewrites `cover:` / `![]()` under `/blog/images/` to `.webp`.

4. Commit the `.webp` files and the Markdown. Do not commit the original png/jpeg.

```bash
npm run check:images   # same gate CI runs; should print: ok: blog images are WebP
```

CI (`npm run check:images` in `.github/workflows`) fails the PR if any png/jpeg remains or Markdown still points at `.png`/`.jpg`. It does **not** convert during Docker / EKS deploy.

