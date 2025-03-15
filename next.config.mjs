/** @type {import('next').NextConfig} */
const nextConfig = {
    output : "standalone",
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true, // Disable ESLint during build
      },
};

export default nextConfig;
