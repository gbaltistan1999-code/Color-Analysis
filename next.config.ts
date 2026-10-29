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
  // Quiz tiles are served as-is (no optimizer), so give them the same one-day browser cache.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  // Permanent redirects for URLs that moved, so old links and search results keep working.
  async redirects() {
    return [
      { source: "/quiz", destination: "/#quiz", permanent: true },
      { source: "/undertone-test", destination: "/skin-undertone-test", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/seasons/warm-spring", destination: "/seasons/true-spring", permanent: true },
      { source: "/seasons/cool-summer", destination: "/seasons/true-summer", permanent: true },
      { source: "/seasons/warm-autumn", destination: "/seasons/true-autumn", permanent: true },
      { source: "/seasons/cool-winter", destination: "/seasons/true-winter", permanent: true },
    ];
  },
};

export default nextConfig;
