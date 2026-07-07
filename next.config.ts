import type { NextConfig } from "next";
import path from "path";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "portfolio";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath =
  isGithubActions &&
  repoName !== `${process.env.GITHUB_REPOSITORY?.split("/")[0]}.github.io`
    ? `/${repoName}`
    : process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: process.platform === "win32" && process.env.CI !== "true",
  },
  webpack: (config, { dir }) => {
    config.resolve.modules = [
      path.join(dir, "node_modules"),
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    return config;
  },
};

export default nextConfig;
