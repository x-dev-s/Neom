/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false, // Disable ESLint during build
  },
};

export default nextConfig;
