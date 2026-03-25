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
      // Unsplash (imágenes blog CC0)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
