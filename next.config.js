/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/life" : "",
  images: {
    unoptimized: true,
  },
  NODE_ENV: process.env.NODE_ENV,
}

module.exports = nextConfig
