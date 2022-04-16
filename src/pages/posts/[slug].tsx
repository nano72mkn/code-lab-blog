import React from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';

import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const postsPath = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postsPath);

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.slug;
  if (!slug) {
    return {
      notFound: true,
    };
  }
  const postPath = path.join(process.cwd(), 'src/posts', slug + '.mdx');
  const markdownWithMeta = fs.readFileSync(postPath, 'utf-8');

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      mdxSource,
    },
  };
};

const PostPage: NextPage<Props> = ({ frontMatter: { title }, mdxSource }) => {
  return (
    <div className="mt-4">
      <h1>{title}</h1>
      <main>
        <MDXRemote {...mdxSource} />
      </main>
    </div>
  );
};

export default PostPage;
