/** @type {import('next').NextConfig} */
const nextConfig = {
  // @repo/ui ships TypeScript source (no build step); Next compiles it with the app.
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
