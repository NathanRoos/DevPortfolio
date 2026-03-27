throw new Error("BUILD DISABLED — maintenance mode");
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
  output: 'standalone',
}

module.exports = nextConfig
