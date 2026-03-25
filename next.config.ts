import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "titansoul.cl",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.titansoul.cl",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
