# syntax=docker/dockerfile:1.7

FROM public.ecr.aws/docker/library/node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
COPY packages ./packages
RUN npm install

FROM base AS builder
ARG SITE_URL=https://floatboat.ai
ARG DEPLOY_MODE=subdirectory
ARG BLOG_BASE_PATH=/blog
ARG ASSET_PREFIX=/blog
ARG NEXT_PUBLIC_ATTRIBUTION_WEB_EVENTS_ENABLED=true
ARG NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL
ENV NODE_ENV=production
ENV SITE_URL=${SITE_URL}
ENV DEPLOY_MODE=${DEPLOY_MODE}
ENV BLOG_BASE_PATH=${BLOG_BASE_PATH}
ENV ASSET_PREFIX=${ASSET_PREFIX}
ENV NEXT_PUBLIC_ATTRIBUTION_WEB_EVENTS_ENABLED=${NEXT_PUBLIC_ATTRIBUTION_WEB_EVENTS_ENABLED}
ENV NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL=${NEXT_PUBLIC_ATTRIBUTION_WEB_EVENT_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM public.ecr.aws/docker/library/node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/blog').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
