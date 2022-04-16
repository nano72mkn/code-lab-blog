import type { InferGetStaticPropsType, NextPage } from 'next';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
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

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <p key={index}>{post.frontMatter.title}</p>
      ))}
    </div>
  );
};

export default Home;
