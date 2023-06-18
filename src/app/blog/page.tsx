import fs from 'fs';
import path from "path";

import matter from "gray-matter";

import { PostCard } from "components/PostCard";

import { PostFrontMatter } from 'types/PostType';

export async function Page() {
  const postsPath = path.join(process.cwd(), 'src/app/posts');
  const files = fs.readdirSync(postsPath);

  const posts = await Promise.all(files.map(async (filename) => {
    const mdxFilePath = path.join(postsPath, filename, 'page.mdx');
    // const meta = require(mdxFilePath);
    // console.log(meta);
    
    const markdownWithMeta = fs.readFileSync(
      mdxFilePath,
      'utf-8',
    );
    const { data } = matter(markdownWithMeta);
    return {
      frontMatter: data as PostFrontMatter,
      slug: filename,
    };
  }));

    await posts.sort((a, b) =>
      new Date(b.frontMatter.date) > new Date(a.frontMatter.date) ? 1 : -1,
    );
    
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10">
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
}

export default Page;
