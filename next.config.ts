import type { NextConfig } from "next";

const assetPrefix = process.env.ASSET_PREFIX || undefined;

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  assetPrefix,
  // Two pods share floatboat.ai. /_next/image on the origin hits aoe-backend,
  // which does not have Blog files and returns 400. Serve public images
  // directly under /blog/images/* (already rewritten to the Blog pod).
  images: {
    unoptimized: true,
    ...(assetPrefix ? { path: `${assetPrefix}/_next/image` } : {}),
  },
  transpilePackages: [
    "@openblog/core",
    "@openblog/content",
    "@openblog/components",
    "@openblog/themes",
  ],
  async redirects() {
    return [];
  },
};

export default nextConfig;
