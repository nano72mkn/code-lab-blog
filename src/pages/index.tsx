import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import Image from 'next/image';

import { Head } from 'components/Head';

import { getOgpCardUrl } from 'utils/getOgpCardUrl';

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
      {posts.map((post, index) => (
        <p key={index}>
          <Image
            src={getOgpCardUrl(post.frontMatter.title)}
            width={300}
            height={157}
          />
          {post.frontMatter.title}
        </p>
      ))}
    </div>
  );
};

export default Home;
