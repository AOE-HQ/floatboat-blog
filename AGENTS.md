<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Floatboat Blog

Independent OpenBlog app mounted at `https://floatboat.ai/blog`. Cloudflare / Ingress rewrites `/blog/*` and `/zh/blog/*` to this service. Anything else on `floatboat.ai` still hits `aoe-backend`.

## Article workflow gate

Before creating or substantially rewriting an article, read `E:\clients\floatboat\blog\README.md`, `E:\clients\floatboat\blog\publishing-contract.md`, and every currently applicable rule in `E:\Agent执行\内容构建\Blog\article-shared\`. “Run the complete Skills” means this full project entry chain, not only the individual research or writing specification named in the prompt.

Create an internal research brief before drafting. After the complete bilingual page is assembled—including frontmatter, body, FAQ, popup, internal links, and media—issue a content verdict using `BLOCKED`, `NEEDS_REVISION`, or `PUBLISH_READY`. Technical checks such as build, TypeScript, image validation, and link audits do not establish editorial readiness. Do not commit, push, or create/update a PR for an article marked `BLOCKED` or `NEEDS_REVISION`, unless the user explicitly asks to publish an unfinished draft.

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
4. **Small updates ride the next big PR.** Do not open standalone PRs for small fixes (dead-link swaps, copy tweaks, doc corrections). Commit them to a ready branch and ship them together with the next substantial PR — the owner reviews one batch, not a trickle. (Exception: a production-breaking error may be hotfixed as its own PR — say so in the body.)
5. **Shared working tree**: if multiple agent sessions use this repo concurrently, create a `git worktree` per session (`git worktree add ../<name> <branch>`) — one branch per worktree. Before committing, review your diff hunk-by-hunk: with a shared tree, another session's half-finished changes can end up inside your files.


## Page heading labels

Do not add decorative eyebrow, kicker, or overline text above H1–H6 on any web page, including blog, marketing, directories, cards, and CTA sections. Retired eyebrow fields must stay out of component props and content schemas. Keep meaningful categories in metadata below the title; keep actual operation step numbers, form labels, navigation, and status indicators in their proper roles.

## FAQ coverage

Marketing pages, directory hubs, and published blog archives require at least six relevant questions in each locale. Use the shared `FaqBand` for display and its single matching FAQPage schema; do not add a second inline FAQ renderer or generic fallback. Blog articles keep their own substantive questions without a six-question quota. Author archives may curate explicit published-article FAQ references with attribution, never fabricated author biographies. Apply the Agent Execution content de-templating workflow to new batches.

## Hero contract

Use the shared `Hero` from `@openblog/components`; marketing/blog components are data adapters. Select only `centered` or `split`. Keep one H1 and a page-specific introduction, with metadata below; no eyebrow, local title italics or partial title accent color. Hero media may be an image, video or demonstration, never a navigation panel. Split requires media and stacks text before media on mobile. Permit at most one direct-conversion action, otherwise omit it; secondary reading/navigation links belong outside Hero.

## Marketplace name intake

For requested project or Skill additions, including name-only requests, first read the "名称输入到分类与建页" workflow in the Floatboat context `product/floatboat-skills-ecosystem.md` (Mac: `~/Documents/Codex/clients/floatboat/`; Windows: `E:\clients\floatboat\`). Verify the canonical upstream and license, distinguish software from task instructions, and check existing project/Skill routes before creating a page. Reuse an existing canonical page for the same work; complementary tools do not become duplicates merely because they cooperate. Complete both locales, reviewed publisher data, aggregate links, related links, share assets, and sitemap coverage. Commit locally after validation; pushing and PR creation still require the owner's explicit request.


## Breadcrumb contract

Use `Breadcrumbs` from `@openblog/components` for every visible trail. The marketing `Breadcrumb` is only a label/data adapter; do not add local navigation markup or styling. Pass the complete hierarchy, including the locale's home, with an absolute or root-relative URL for every item, including the current page. The shared component owns the sole matching `BreadcrumbList`; do not repeat it in page schemas. Current items are text with `aria-current="page"`; ancestor navigation stays in the same tab. Blog author archives must resolve their author path, not a category path.

After changes, build and run `python3 scripts/check_breadcrumbs.py` to verify generated content pages have one visible trail, one matching schema and the correct canonical/current URL.

## Introduction section contract

Use `OverviewSection` for standalone introduction/about/scope/positioning sections. Choose an explicit variant: `prose` for text, `profile` for text with identity/source links, or `features` for text with structured supporting traits. The component owns heading typography, reading width, spacing, borders and responsive layout; do not reproduce them in page markup. Organization, creator, software and Skill are content identities, not separate visual implementations. Keep source links inside `ProfileCard`, omit absent logos, and adapt copy to the page's actual topic rather than copying a generic introduction. Hero summaries, article prose, workflow steps and capability demonstrations keep their own roles. Add a new variant only for a verified introduction need, not a page-specific styling preference.


## Task conversion contract

Use `StartInFloatboat` for a concrete task, with `resource` (a specific Skill/software source) or `task` (a bounded workflow) variants. Current rollout is limited to Skill and independent-project detail pages, immediately after Hero. Do not add it to publisher pages, marketplaces, category hubs or category pages, model pages, or archives. Other task pages require their own task-specific decision before rollout. The primary flow is edit a specific task, preview/copy its request, then download Floatboat and paste it into a conversation; do not imply automatic app launch, prompt transfer, or installed third-party integration. Keep native Skill installation inside the secondary disclosure. Do not send task text through download URLs or analytics. Resource copy lives in `src/data/resource-start-tasks.json`; unique titles alone are insufficient: input, workflow and deliverable must pass the Agent Execution de-templating swap and batch review. Build and run `python3 scripts/check_resource_conversion.py` to verify exact coverage and exclusions.

## Use Cases contract

Use the single detailed `UseCasesSection` only outside the `/use-cases` page family. Every item requires `title`, `brief` (task input), `process` (processing focus), and `outcome` (expected result); do not restore a summary variant, decorative item labels, or the unused exclusions API. Owning content uses `useCases` and the shared schemas/localization helper in `src/lib/marketing/use-cases.ts`, not parallel audiences/scenarios/model.workflows structures. Write concrete inputs and checkable outputs for each resource or feature; comply with the Agent Execution de-templating swap/batch review. Keep model access limitations intact and do not infer integration from a scenario. Consolidate repeated usage claims into this section or existing model-selection content instead of restoring supplemental model extensions cards. PersonaWorkScenes, UseCaseCatalog, and PersonaLiveDemo remain independent page-body/navigation/demo components. After building, run `python3 scripts/check_use_cases.py` for content, localization, scope and retired-field checks.
