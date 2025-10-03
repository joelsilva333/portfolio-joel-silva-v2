import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
