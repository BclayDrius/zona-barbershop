import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Sitio 100% estático → se sirve como Static Assets de Cloudflare Workers
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
