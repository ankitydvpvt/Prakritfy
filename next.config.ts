import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // 🔽 REQUIRED for Netlify deploy without Git
  output: "export",

  // 🔽 REQUIRED to avoid image errors
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
