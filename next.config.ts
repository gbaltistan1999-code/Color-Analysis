import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A lockfile also exists in the parent folder; pin tracing to this app.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
