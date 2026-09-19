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

## Git & PR workflow (hard rule for agent sessions)

**Never push or open a PR on your own initiative.** The owner explicitly gates this: they say "PR" when they want PRs created — until then, do not push, do not run `gh pr create`, and do not merge.

1. **Work on a feature branch** (`fix/...`, `feat/...`), never on `main`. Commit with conventional messages and run local verification (`npm run validate:posts`, `npm run check:images`, `npx tsc --noEmit`, eslint on changed files) before considering a task done.
2. **Stop after commit.** Report what is ready and wait. Multiple tasks may accumulate across branches — that is intentional; the owner batches them.
3. **When the owner says "PR"**: push every ready branch and open one PR per branch (`gh pr create --repo AOE-HQ/floatboat-blog --base main --head <branch>`), each with problem/fix/verification in the body. CI runs on the PR; merging is the owner's call.
4. **Merge = deploy.** Any push to `main` triggers `deploy-ghcr-eks.yaml` (image build → GHCR → EKS rollout). Never commit directly to `main`.
5. **Shared working tree**: if multiple agent sessions use this repo concurrently, create a `git worktree` per session (`git worktree add ../<name> <branch>`) — one branch per worktree. Before committing, review your diff hunk-by-hunk: with a shared tree, another session's half-finished changes can end up inside your files.

