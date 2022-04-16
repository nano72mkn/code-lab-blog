import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import RSS from 'rss';

export const generateFeedXml = async () => {
  const feed = new RSS({
    title: 'タイトル',
    description: '説明',
    site_url: 'サイトのURL',
    feed_url: 'フィードページのURL',
    language: 'ja',
  });

  const postsPath = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postsPath);
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(postsPath, filename),
      'utf-8',
    );
    const { data } = matter(markdownWithMeta);
    return {
      frontMatter: data as PostFrontMatter,
      slug: filename.replace('.mdx', ''),
    };
  });

  posts?.forEach((post) => {
    feed.item({
      title: post.frontMatter.title,
      description: '',
      date: new Date(post.frontMatter.date),
      url: `https://blog.code-lab.xyz/posts/${post.slug}`,
    });
  });

  return feed.xml();
};
