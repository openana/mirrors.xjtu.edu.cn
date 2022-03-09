const remarkMath = import('remark-math');
const rehypeKatex = import('rehype-katex');
const { createProxyMiddleware } = require('http-proxy-middleware');

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: `XJTU Software Mirrors`,
    siteUrl: `https://mirrors.xjtu.edu.cn/`,
    description: `The Xi'an Jiaotong University Software Mirrors website.`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: '<span>#</span>',
              className: 'anchor',
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: ['h1', 'h2', 'h3', 'h4'],
            },
          },
          // 'gatsby-remark-autolink-headers',
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-yaml-full',
      options: {
        plugins: [
          {
            resolve: 'gatsby-yaml-full-markdown',
            options: {
              plain: true,
            },
          },
          {
            resolve: 'mdx-yaml-full',
            options: {
              plain: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: './content/',
      },
      __key: 'content',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'templates',
        path: './src/templates/',
      },
      __key: 'templates',
    },
  ],
  pathPrefix: '/.dev',
  trailingSlash: 'always',
  developMiddleware: (app) => {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://mirrors.xjtu.edu.cn',
        autoRewrite: true,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('Host', 'mirrors.xjtu.edu.cn');
        },
      }),
    );
  },
};
