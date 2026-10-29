import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A lockfile also exists in the parent folder; pin tracing to this app.
  outputFileTracingRoot: process.cwd(),
  images: {
    // AVIF first (smallest), WebP for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
    // Let browsers reuse optimized images for a day instead of revalidating every visit.
    minimumCacheTTL: 86400,
    // Our layouts never render images wider than ~1200px; skip generating huge variants.
    deviceSizes: [384, 640, 750, 828, 1080, 1200],
  },
  async redirects() {
    return [{ source: "/undertone-test", destination: "/skin-undertone-test", permanent: true }];
  },
};

export default nextConfig;
