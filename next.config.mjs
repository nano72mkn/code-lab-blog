import remarkGfm from "remark-gfm";
import rehypeSlug from'rehype-slug';
import createMDX from "@next/mdx";


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
  experimental: {
    appDir: true,
    mdxRs: true,
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

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
export default withMDX(nextConfig);
