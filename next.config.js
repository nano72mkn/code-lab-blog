const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime.js': require.resolve('react/jsx-runtime'),
    };
    return config;
  },
  images: {
    domains: [
      'www.google.com',
      'blog.code-lab.xyz',
      'localhost',
      'res.cloudinary.com',
      'cdn.blog.st-hatena.com',
      'planning-poker-remix.code-lab.xyz',
      'nextjs.org',
      'typicode.github.io',
    ],
  },
};

module.exports = withMDX(nextConfig);
