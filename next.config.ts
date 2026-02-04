import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/pav-mel" : "",
  assetPrefix: isGitHubPages ? "/pav-mel" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/pav-mel" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
