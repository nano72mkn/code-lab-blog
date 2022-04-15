import type { NextPage } from 'next';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export const getStaticProps = async () => {
  const postPath = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postPath);
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(postPath, filename),
      'utf-8',
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.replace('.mdx', ''),
    };
  });

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<{
  posts: {
    slag: string;
    frontMatter: {
      title: string;
      published: boolean;
      tags: string[];
    };
  }[];
}> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <p key={index}>{post.frontMatter.title}</p>
      ))}
    </div>
  );
};

export default Home;
