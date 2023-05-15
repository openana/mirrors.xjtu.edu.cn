/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/mirrors.json',
  //       destination: 'https://mirrors.xjtu.edu.cn/api/status.json',
  //     },
  //   ];
  // },
};

const { withContentlayer } = require('next-contentlayer');
module.exports = withContentlayer(nextConfig);
