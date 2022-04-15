import React from 'react';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { GetStaticProps, NextPage } from 'next';
import { Header } from 'components/Header';

interface Props {
  frontMatter: any;
  slug: string;
  mdxSource: MDXRemoteSerializeResult;
}

export const getStaticPaths = async () => {
  const postPath = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postPath);

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

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (!slug) {
    return {
      notFound: true,
    };
  }
  const postPath = path.join(process.cwd(), 'src/posts', slug + '.mdx');
  const markdownWithMeta = fs.readFileSync(postPath, 'utf-8');

  console.log('markdownWithMeta', markdownWithMeta);

  const { data: frontMatter, content } = matter(markdownWithMeta);
  console.log(frontMatter);
  const mdxSource = await serialize(content, { parseFrontmatter: true });
  console.log(mdxSource);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

const PostPage: NextPage<Props> = ({
  slug,
  frontMatter: { title },
  mdxSource,
}) => {
  console.log(slug, mdxSource);
  return (
    <div className="mt-4">
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} />
    </div>
  );
};

export default PostPage;
