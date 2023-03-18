/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    ORIGINAL_DATA: `https://${process.env.ORIGINAL_DATA}`,
    CONVERT_DATA: `https://${process.env.CONVERT_DATA}`,
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API,
      },
      {
        source: "/convert/:filename*",
        destination: `https://${process.env.CONVERT_DATA}:filename*`,
      },
      {
        source: "/original/:filename*",
        destination: `https://${process.env.ORIGINAL_DATA}:filename*`,
      },
    ];
  },
}

module.exports = nextConfig
