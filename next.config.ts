import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/tv',
  assetPrefix: '/tv/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
