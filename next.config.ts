import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeORM e pg carregam drivers dinamicamente: não devem passar pelo bundler.
  serverExternalPackages: ["typeorm", "pg"],
  images: {
    // As capas e galerias são geridas no painel e podem vir de qualquer domínio HTTPS.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
