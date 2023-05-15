const extraConfigs =
  process.env.NODE_ENV === 'development'
    ? {
        async rewrites() {
          return [
            {
              source: '/api/mirrors.json',
              destination: 'https://mirrors.xjtu.edu.cn/api/status.json',
            },
            {
              source: '/api/mirrors/:path*',
              destination: 'https://mirrors.xjtu.edu.cn/api/mirrors/:path*',
            },
          ];
        },
      }
    : {
        output: 'export',
        distDir: 'dist',
      };

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...extraConfigs,
};

const { withContentlayer } = require('next-contentlayer');
module.exports = withContentlayer(nextConfig);
