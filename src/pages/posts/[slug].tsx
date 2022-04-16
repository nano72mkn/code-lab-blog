import fs from 'fs';
import path from 'path';

import React from 'react';

import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { CodeBlock } from 'components/CodeBlock';
import { Head } from 'components/Head';

import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import type { MDXRemoteProps } from 'next-mdx-remote';

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
      slug,
      mdxSource,
    },
  };
};

const components: MDXRemoteProps['components'] = {
  h1: (props) => (
    <h1
      {...props}
      id={props.children?.toString()}
      className="text-2xl font-bold"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      id={props.children?.toString()}
      className="text-2xl font-bold"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      id={props.children?.toString()}
      className="text-2xl font-bold"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      id={props.children?.toString()}
      className="text-2xl font-bold"
    />
  ),
  h5: (props) => (
    <h4
      {...props}
      id={props.children?.toString()}
      className="text-2xl font-bold"
    />
  ),
  h6: (props) => (
    <h4
      {...props}
      id={props.children?.toString()}
      className="text-2xl font-bold"
    />
  ),
  pre: (props: any) => <CodeBlock {...props.children.props} />,
};

const PostPage: NextPage<Props> = ({
  frontMatter: { title },
  slug,
  mdxSource,
}) => {
  return (
    <div className="mt-4">
      <Head title={title} slug={slug} />
      <h1>{title}</h1>
      <main>
        <MDXRemote {...mdxSource} components={components} />
      </main>
    </div>
  );
};

export default PostPage;
