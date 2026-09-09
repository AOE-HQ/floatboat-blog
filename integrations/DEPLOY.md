# Floatboat Blog — 主站反向代理

博客独立部署后，在 **floatboat.ai**（自有站点 / Railway + Cloudflare）配置 Rewrite，使访客只见主域 URL。

## 环境变量（主站侧）

| 变量 | 示例 | 说明 |
|------|------|------|
| `BLOG_ORIGIN` | `https://floatboat-blog-xxx.up.railway.app` | 博客 deployment origin（不含路径） |

## Rewrite 规则

| 请求路径 | 转发目标 |
|---------|---------|
| `/blog/*` | `${BLOG_ORIGIN}/blog/*` |
| `/zh/blog/*` | `${BLOG_ORIGIN}/zh/blog/*` |
| `/blog/sitemap.xml` | `${BLOG_ORIGIN}/blog/sitemap.xml` |

## 博客侧 env

```env
SITE_URL=https://floatboat.ai
DEPLOY_MODE=subdirectory
BLOG_BASE_PATH=/blog
ASSET_PREFIX=/blog
```

## 验收 checklist

- [ ] `/blog` 样式与静态资源完整
- [ ] `canonical` = `https://floatboat.ai/blog/{slug}`（中文 = `/zh/blog/{slug}`）
- [ ] sitemap `<loc>` 无 deployment 子域泄漏
- [ ] 中英页面 hreflang 互指
- [ ] 语言切换器可在有对侧版本的文章间跳转

## 回滚

移除主站 Rewrite → 旧 CMS `/blog` 恢复。
