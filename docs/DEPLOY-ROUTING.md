# Subdomain compatibility routing

Floatboat deploys in `subdirectory` mode in production, so canonical public URLs retain their real paths, including `/blog`. The optional `subdomain` mode exists for installations that expose the blog at a dedicated host and want article URLs without the `/blog` prefix.

## Active implementation

The routing code lives in [`src/proxy.ts`](../src/proxy.ts), the Next.js 16 proxy convention. It runs only when `DEPLOY_MODE=subdomain`; `subdirectory` and `standalone` requests pass through unchanged.

| Public request in subdomain mode | Internal route |
|---|---|
| `/` | `/blog` |
| `/{slug}` | `/blog/{slug}` |
| `/category/{slug}` | `/blog/category/{slug}` |
| `/tag/{slug}` | `/blog/tag/{slug}` |
| `/author/{slug}` | `/blog/author/{slug}` |
| `/sitemap.xml` | `/blog/sitemap.xml` |

Requests already under `/blog`, `/zh`, `/_next`, or `/api` pass through. Paths containing a file extension also pass through so static assets are not treated as article slugs.

## Production mode

The Floatboat production deployment uses:

```env
SITE_URL=https://floatboat.ai
DEPLOY_MODE=subdirectory
BLOG_BASE_PATH=/blog
ASSET_PREFIX=/blog
```

In this mode, `src/proxy.ts` is intentionally a no-op. The main-site/edge layer owns public route forwarding; see [`integrations/DEPLOY.md`](../integrations/DEPLOY.md).

## Verification

When changing routing behavior, verify both modes explicitly:

1. Run `npm run build` with the production environment and confirm canonical URLs retain `floatboat.ai`.
2. Run with `DEPLOY_MODE=subdomain` and confirm root, article, taxonomy, and sitemap rewrites.
3. Confirm `/_next`, `/api`, `/zh`, and static assets are never rewritten into `/blog`.
