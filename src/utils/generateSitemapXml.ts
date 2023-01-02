import { format } from 'date-fns';

import { appHost } from 'config/app';

import { getPostsData } from './getPostsData';

export const generateSitemapXml = (): string => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  xml += `
      <url>
        <loc>${appHost}</loc>
        <lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>
        <changefreq>monthly</changefreq>
      </url>
    `;

  const posts = getPostsData();

  posts.forEach((post) => {
    xml += `
      <url>
        <loc>${appHost}/posts/${post.slug}</loc>
        <lastmod>${format(
          post.frontMatter.update
            ? new Date(post.frontMatter.update)
            : new Date(post.frontMatter.date),
          'yyyy-MM-dd',
        )}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
};
