<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Floatboat Blog

Independent OpenBlog app mounted at `https://floatboat.ai/blog`. Cloudflare / Ingress rewrites `/blog/*` and `/zh/blog/*` to this service. Anything else on `floatboat.ai` still hits `aoe-backend`.

## Images

- Put article images in `public/blog/images/<slug>/`. Public URL must start with `/blog/images/` so the rewrite reaches this pod.
- **WebP only** for rasters (`.png` / `.jpg` / `.jpeg` are not served in production). Keep SVG as SVG (logo lives at `/blog/brand/floatboat-logo.svg`).
- Markdown `cover:` and `![]()` paths: `/blog/images/<slug>/<file>.webp`.
- Do not use Next `/_next/image`. That path is aoe-backend's optimizer and 400s for Blog files.
- Convert existing rasters (max edge 1920, quality 80) and rewrite Markdown:

```bash
node scripts/convert-blog-images-to-webp.mjs
```

- Do not put static files at `/brand/...`, `/favicon.ico`, or other origin-root paths. Those go to the main site.

