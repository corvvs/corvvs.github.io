/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  basePath: isProduction ? "/life" : "",
  assetPrefix: isProduction ? "/life/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    ne: process.env.NODE_ENV,
    assetPrefix: isProduction ? "/life" : "",
    basePath: isProduction ? "/life/" : "",
    isProduction,
  },
};

module.exports = nextConfig
