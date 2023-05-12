/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
    mdxRs: true,
  },
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
