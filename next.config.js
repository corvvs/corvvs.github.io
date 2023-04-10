/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProduction ? "/life" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    assetPrefix: isProduction ? "/life" : "",
    isProduction,
  },
};

module.exports = nextConfig
