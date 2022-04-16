import fs from 'fs';
import path from 'path';

import React from 'react';

import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { CodeBlock } from 'components/CodeBlock';
import { Head } from 'components/Head';
import { Link } from 'components/Link';

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
      className="text-3xl font-bold mt-14 mb-10 pb-3 border-b-2"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      id={props.children?.toString()}
      className="text-2xl font-bold mt-10 mb-5"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      id={props.children?.toString()}
      className="text-xl font-bold  mt-7 mb-3"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      id={props.children?.toString()}
      className="text-xl font-bold  mt-7 mb-3"
    />
  ),
  h5: (props) => (
    <h5
      {...props}
      id={props.children?.toString()}
      className="font-bold mt-7 mb-3"
    />
  ),
  h6: (props) => (
    <h6
      {...props}
      id={props.children?.toString()}
      className="font-bold mt-7 mb-3"
    />
  ),
  p: (props) =>
    props.children &&
    typeof props.children === 'string' &&
    props.children.indexOf('http') === 0 ? (
      <Link href={props.children as string}>{props.children}</Link>
    ) : (
      <p {...props} />
    ),
  pre: (props: any) => <CodeBlock {...props.children.props} />,
  blockquote: (props) => (
    <blockquote
      className="my-5 p-10 border-0 border-l-4 text-gray-700 bg-gray-100"
      {...props}
    />
  ),
  a: (props) => <Link href={props.href}>{props.children}</Link>,
  link: (props) => <Link href={props.href}>{props.children}</Link>,
  code: (props) => (
    <code
      className="mx-2 px-2 py-1 text-sm bg-slate-100 rounded-md border border-slate-300"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-10 my-5" {...props} />,
  ol: (props) => <ol className="list-decimal pl-10 my-5" {...props} />,
  li: (props) => <li className="my-3" {...props} />,
};

const PostPage: NextPage<Props> = ({
  frontMatter: { title },
  slug,
  mdxSource,
}) => {
  return (
    <div>
      <main className="mt-4">
        <Head title={title} slug={slug} />
        <h1>{title}</h1>
        <article>
          <MDXRemote {...mdxSource} components={components} />
        </article>
      </main>
      <aside></aside>
    </div>
  );
};

export default PostPage;
