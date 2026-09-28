# Floatboat Blog

OpenBlog-powered bilingual blog module mirroring [floatboat.ai/blog](https://floatboat.ai/blog). Content lives in `content/blog/` as Markdown with YAML frontmatter.

This repository is self-contained for Blog content, routes, validation, build, and deployment. Product research, keyword strategy, weekly reporting, and internal planning are maintained outside this repository and are not required to build or publish it.

## Stack

- OpenBlog 0.2 (`@openblog/core`, `@openblog/components`, `@openblog/content`)
- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Deploy mode: **subdirectory** on `floatboat.ai/blog`

## Quick start

```powershell
cd E:\客户部署项目\floatboat-blog
npm install
npm run dev
```

Open [http://localhost:3777/blog](http://localhost:3777/blog).

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Production | Local dev |
|----------|------------|-----------|
| `SITE_URL` | `https://floatboat.ai` | `http://localhost:3000` |
| `DEPLOY_MODE` | `subdirectory` | `subdirectory` |
| `BLOG_BASE_PATH` | `/blog` | `/blog` |
| `ASSET_PREFIX` | `/blog` (when behind rewrite) | — |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production SSG build |
| `npm run validate:posts` | Frontmatter validation |
| `npm run theme:sync` | Sync theme from `openblog.config.ts` |

## Content

```
content/blog/
├── *.md              # English posts (locale: en)
└── zh/*.md           # Chinese posts (locale: zh)
```

Export/migration from the live site:

```powershell
cd scripts
python export_floatboat_blog.py               # all native posts (en+zh, with images)
python export_floatboat_blog.py --missing-only
python export_floatboat_blog.py --limit 5     # smoke test
python export_floatboat_blog.py --no-images
```

The exporter reads the live `sitemap.xml`, detects each article's actual content
language, and writes its **native** copy to the matching locale folder.
Translated counterparts are produced by a separate translation pass that tracks
progress in `scripts/data/floatboat_manifest.json`.

Images: `public/blog/images/{slug}/` (shared by both locales).

### Ownership

- Published article copy, frontmatter, slug, locale, category, FAQ data, and images are maintained in this repository.
- Current article inventory is derived from `content/blog/`; do not maintain a second manual inventory.
- Link maps and audit reports generated from the corpus are reproducible outputs, not independent editorial sources.
- Planning documents may propose work, but repository files and validation determine what is actually publishable.

## Routes

| Path | Description |
|------|-------------|
| `/blog` | English article index |
| `/blog/{slug}` | English editorial post |
| `/zh/blog` | Chinese article index |
| `/zh/blog/{slug}` | Chinese editorial post |
| `/blog/sitemap.xml` | Blog sitemap (hreflang en/zh) |

## Deployment

Pushing Markdown to `main` runs GitHub Actions: validate posts, production build, publish an immutable GHCR image, and deploy it to EKS at `https://blog.floatboat.ai/blog`.

When mounted at `floatboat.ai/blog/*` via Cloudflare/Railway rewrite:

1. Set `SITE_URL=https://floatboat.ai`
2. Set `ASSET_PREFIX=/blog` if `/_next/static` 404s on the main domain
3. Rewrite `/blog/*` and `/zh/blog/*` to this deployment

See `integrations/DEPLOY.md`.

## Configuration

- Site + chrome + theme: `openblog.config.ts`
- Nav/footer fallbacks: `src/chrome/site-chrome.ts`
- i18n: `src/config/i18n.ts`

## Contribution Workflow

Read [`AGENTS.md`](./AGENTS.md) before making changes. Work on a feature branch or isolated worktree, run checks appropriate to the changed files, and stop after the local commit unless the owner explicitly requests a PR. Merging to `main` deploys production.
