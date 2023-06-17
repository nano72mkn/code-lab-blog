import matter from "gray-matter";
import path from "path";
import fs from 'fs';
import { FC } from "react";
import { PostCard } from "components/PostCard";

const Page: FC = () => {
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

    posts.sort((a, b) =>
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
