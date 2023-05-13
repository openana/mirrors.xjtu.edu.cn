/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

const { withContentlayer } = require('next-contentlayer');
module.exports = withContentlayer(nextConfig);
