import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ✅ Required for Cloud Run
  output: "export",

  // Optional (keep if you want)
   trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
