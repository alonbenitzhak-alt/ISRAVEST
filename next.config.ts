import type { NextConfig } from "next";

/** @see https://nextjs.org/docs/app/api-reference/config/next-config-js */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

