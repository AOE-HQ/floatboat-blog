# Floatboat Blog and Product Pages

This repository powers Floatboat's bilingual editorial site and selected product landing pages. It combines OpenBlog content infrastructure with a Next.js 16 App Router application, shared product chrome, analytics, and deployment configuration.

## What lives here

- English and Chinese articles in `content/blog/`
- Blog indexes, article pages, taxonomy pages, authors, and sitemap
- Product landing pages for Agent Workspace, Work Agent, AI Scheduling Assistant, AI File Organizer, and FloatIM
- Shared header, footer, landing-page components, metadata, analytics, and deployment manifests

Product strategy and research remain in their source repositories; this deployment repository contains only the copy and implementation needed to ship the site.

## Stack

- OpenBlog 0.2 (`@openblog/core`, `@openblog/components`, `@openblog/content`)
- Next.js 16 (App Router), TypeScript, and Tailwind CSS
- Subdirectory deployment on `floatboat.ai`, with an independent origin at `blog.floatboat.ai`

## Quick start

```powershell
cd E:\客户部署项目\floatboat-blog
npm install
npm run dev
```

Open [http://localhost:3777/blog](http://localhost:3777/blog) for the blog or [http://localhost:3777/agent-workspace](http://localhost:3777/agent-workspace) for the primary product page.

## Environment

Copy `.env.example` to `.env.local` when local overrides are needed.

| Variable | Production | Local development |
|---|---|---|
| `SITE_URL` | `https://floatboat.ai` | `http://localhost:3777` |
| `DEPLOY_MODE` | `subdirectory` | `subdirectory` |
| `BLOG_BASE_PATH` | `/blog` | `/blog` |
| `ASSET_PREFIX` | `/blog` | unset |
| `PORT` | `3000` in Kubernetes | `3777` via npm scripts |

Analytics and attribution variables are documented in `.env.example`.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Sync the theme and start the local server on port 3777 |
| `npm run build` | Sync the theme, validate posts, and create a production build |
| `npm run start` | Serve a production build on port 3777 |
| `npm run lint` | Run ESLint |
| `npm run validate:posts` | Validate article frontmatter and content invariants |
| `npm run theme:sync` | Generate theme CSS from `openblog.config.ts` |
| `npm run images:webp` | Generate optimized WebP article images |
| `npm run check:images` | Check article image policy |

See `AGENTS.md` for the repository's complete content, image, accessibility, and verification rules.

## Routes

Every public page has an English route and a `/zh` counterpart.

| Route | Purpose |
|---|---|
| `/blog`, `/zh/blog` | Article indexes |
| `/blog/{slug}`, `/zh/blog/{slug}` | Editorial articles |
| `/blog/category/{slug}`, `/zh/blog/category/{slug}` | Category archives |
| `/blog/author/{slug}`, `/zh/blog/author/{slug}` | Author archives |
| `/agent-workspace`, `/zh/agent-workspace` | Floatboat Agent Workspace |
| `/coworker`, `/zh/coworker` | Floatboat Work Agent |
| `/ai-scheduling-assistant`, `/zh/ai-scheduling-assistant` | AI Scheduling Assistant |
| `/ai-file-organizer`, `/zh/ai-file-organizer` | AI File Organizer |
| `/floatim`, `/zh/floatim` | FloatIM |
| `/blog/sitemap.xml` | Canonical bilingual sitemap |

## Content and assets

Articles use Markdown with YAML frontmatter:

```text
content/blog/
├── *.md       # English posts (locale: en)
└── zh/*.md    # Chinese posts (locale: zh)
```

Article images live under `public/blog/images/{slug}/` and are shared across locales. Use the image scripts above instead of adding avoidable PNG or JPEG assets directly.

The legacy migration utility remains available in `scripts/export_floatboat_blog.py`; its progress file is `scripts/data/floatboat_manifest.json`. It is not part of the normal publishing flow.

## Configuration

- Site identity, theme, and OpenBlog behavior: `openblog.config.ts`
- Shared site header and footer: `src/components/layout/site-header.tsx` and `src/components/layout/site-footer.tsx`
- Product landing-page content and presentation: `src/lib/landing/` and `src/components/landing/`
- Locale helpers: `src/config/i18n.ts`
- Subdomain compatibility routing: `src/proxy.ts`
- CI and deployment: `.github/workflows/`, `Dockerfile`, and `k8s/`

## Deployment

Pull requests run validation and production-build checks but do not create a hosted preview. A push to `main` builds an immutable GHCR image and deploys it to EKS at `https://blog.floatboat.ai`.

Public `floatboat.ai` routes are forwarded to that deployment by the main-site/edge routing layer. Keep `/api/analytics/events` on the main backend so attribution remains continuous across editorial and product pages.

See `integrations/DEPLOY.md` for route ownership, environment settings, verification, and rollback details. See `docs/DEPLOY-ROUTING.md` for the optional subdomain compatibility mode.
