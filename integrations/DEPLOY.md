# Floatboat 内容站与产品页部署路由

本仓库独立部署在 `blog.floatboat.ai`，同时通过 Kubernetes Ingress 将归属本仓库的路径挂载到 `floatboat.ai` 与 `www.floatboat.ai`。访客使用主域 URL，canonical 也始终指向主域。

## 路由归属

`k8s/ingress-main.yaml` 是主域路径归属的维护源。当前由本服务承接：

- `/blog`、`/zh/blog` 及其子路径
- `/agent-workspace`、`/zh/agent-workspace`
- `/coworker`、`/zh/coworker`
- `/ai-scheduling-assistant`、`/zh/ai-scheduling-assistant`
- `/ai-file-organizer`、`/zh/ai-file-organizer`
- `/floatim`、`/zh/floatim`

不要把 `/_next/image`、`/brand/*` 或 `/api/analytics/events` 整体转给本服务。博客静态资源应位于 `/blog/...`，例如：

- 文章图片：`/blog/images/...`
- 品牌标志：`/blog/brand/floatboat-logo.svg`

`/api/analytics/events` 继续由主站 `aoe-backend` 处理。内容站复用主站的 `fb_anon_id` 与 `fb_attr_params` Cookie，使博客、功能页与主站 CTA 之间的归因保持连续。

## 生产环境变量

```env
SITE_URL=https://floatboat.ai
DEPLOY_MODE=subdirectory
BLOG_BASE_PATH=/blog
ASSET_PREFIX=/blog
NEXT_PUBLIC_ATTRIBUTION_WEB_EVENTS_ENABLED=true
```

主域部署时可以不设置 `NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL`，请求会发往同源的 `/api/analytics/events`。独立预览域需要显式设置完整的主站采集地址：

```env
NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL=https://floatboat.ai/api/analytics/events
```

## CI、镜像与 EKS

Pull Request 会运行文章校验与生产构建，但不会生成托管预览。合并并推送到 `main` 后，GitHub Actions 会：

1. 校验 `content/blog/**/*.md`。
2. 执行 `npm run build`。
3. 构建并推送不可变镜像 `ghcr.io/aoe-hq/floatboat-blog:<sha>`。
4. 部署到 EKS 的 `aoe/floatboat-blog`。

部署源站为 `https://blog.floatboat.ai`。主域入口由 `floatboat-blog-main-nginx` Ingress 转发；仅更新应用代码而未更新 Ingress 时，新功能页不会在主域生效。

## 本地容器验证

```bash
docker build -t floatboat-blog .
docker run --rm -p 3000:3000 floatboat-blog
```

至少检查：

- `http://localhost:3000/blog`
- `http://localhost:3000/agent-workspace`
- `http://localhost:3000/coworker`
- 对应的 `/zh/...` 页面

## 上线验收

- [ ] 博客、Agent Workspace、Work Agent 及其他功能页在主域返回 200
- [ ] 样式、字体与 `/blog/...` 静态资源完整
- [ ] canonical 指向 `https://floatboat.ai/...`，不泄漏 deployment 子域
- [ ] 中英文页面的 hreflang 与语言切换互指正确
- [ ] `/api/analytics/events` 仍由主站后端接收
- [ ] `blog.floatboat.ai` 源站可以用于部署验证

## 回滚

- 应用回滚：将 Deployment 切回上一不可变镜像。
- 主域路由回滚：从 `k8s/ingress-main.yaml` 移除对应路径并重新应用 Ingress。
- 不要删除整个 Ingress 来回滚单一功能页，否则会同时中断博客和其他由本仓库承接的产品页。
