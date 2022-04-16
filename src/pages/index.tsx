import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { Head } from 'components/Head';
import { PostCard } from 'components/PostCard';

import type { InferGetStaticPropsType, NextPage } from 'next';

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

  posts.sort((a, b) =>
    new Date(b.frontMatter.date) > new Date(a.frontMatter.date) ? 1 : -1,
  );

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head />
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
