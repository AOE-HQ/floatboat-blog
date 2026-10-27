# Combo Store routing handoff

Apply to both `floatboat.ai` and `www.floatboat.ai`. Forward matching requests to Kubernetes namespace `aoe`, service `floatboat-blog`, port `80` (public origin: `https://blog.floatboat.ai`). Preserve the original path and query string; do not add `/blog` to page paths. This is reverse proxy routing, not an HTTP redirect.

Exact matches:

- `/combostore`
- `/zh/combostore`

Prefix matches (include the base path and descendants):

- `/combostore/categories` and `/zh/combostore/categories`
- `/combostore/{publisher}` and `/zh/combostore/{publisher}` for these approved publishers:

```text
pbakaus
obra
vercel-labs
morluto
anthropics
heygen-com
mattpocock
emilkowalski
coreyhaines31
juliusbrussee
microsoft
open.feishu.cn
remotion-dev
leonxlnx
cloudflare
trailofbits
github
googleworkspace
firecrawl
supabase
```

Segment boundary required: `/combostore/obra` matches itself and `/combostore/obra/...`, but not `/combostore/obra-other`.

Keep `/blog/*` routed to the same Blog service, including `/blog/_next/*`, `/blog/brand/*`, and `/blog/images/*`. Skill share images are at `/blog/images/skill-guides/*`. Do not redirect or rewrite them to the main application's assets.

Do not blanket-route `/combostore/*`. Unlisted legacy detail URLs retain their existing ownership. No old Skill URL redirects are needed: these new guides have not been launched. Do not redirect the merged aliases `heygen-com/hyperframes-cli`, `mattpocock/grill-with-docs`, or `mattpocock/grilling`.

Leave `/api/analytics/events`, root `/_next/*`, root `/brand/*`, and all other main-site routes with their current services. Avoid any main-repository route with higher priority shadowing the rules above.

Deployment order: deploy the Blog PR first; verify the origin; then switch main-site routing. Check both locales, a category, a publisher, a Skill detail, its CSS/JS and brand logos, and its OG image. Main-domain canonical URLs must stay `https://floatboat.ai/...`.
