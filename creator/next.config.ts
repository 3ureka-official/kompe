import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        `https://${process.env.SUPABASE_HOST}/storage/v1/object/public/**`,
      ),
      {
        protocol: "https",
        hostname: "*.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "scdn.line-apps.com",
      },
    ],
  },
};

export default nextConfig;
