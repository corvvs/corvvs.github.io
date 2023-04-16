/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    ne: process.env.NODE_ENV,
    isProduction,
  },
};

module.exports = nextConfig
