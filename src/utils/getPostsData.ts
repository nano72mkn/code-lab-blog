import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { Post, PostFrontMatter } from 'types/PostType';

export const getPostsData = (): Post[] => {
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

  return posts;
};
