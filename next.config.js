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
        images: {
          unoptimized: true,
        },
      }
    : {
        output: 'export',
        distDir: 'dist',
        productionBrowserSourceMaps: true,
        useFileSystemPublicRoutes: false,
        compiler: {
          removeConsole: true,
        },
      };

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  ...extraConfigs,
};

const { withContentlayer } = require('next-contentlayer');
module.exports = withContentlayer(nextConfig);
