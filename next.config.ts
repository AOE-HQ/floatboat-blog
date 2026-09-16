import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  assetPrefix: process.env.ASSET_PREFIX || undefined,
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
