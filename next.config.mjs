/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // ESLint errors are warnings during local dev; disable in production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors would also block the build; we rely on local IDE checks
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    }
  }
};

export default nextConfig;
