import fs from 'fs';
import path from 'path';

import React from 'react';

import { format } from 'date-fns';
import matter from 'gray-matter';
import toc from 'markdown-toc';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import NextLink from 'next/Link';

import { CodeBlock } from 'components/CodeBlock';
import { Head } from 'components/Head';
import { Link } from 'components/Link';

import type { GetStaticProps, NextPage } from 'next';
import type { MDXRemoteProps } from 'next-mdx-remote';

type Props = {
  frontMatter: PostFrontMatter;
  slug: string;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  tocData: ReturnType<typeof toc>['json'];
};

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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) {
    return {
      notFound: true,
    };
  }
  const postPath = path.join(process.cwd(), 'src/posts', slug + '.mdx');
  const markdownWithMeta = fs.readFileSync(postPath, 'utf-8');

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  const tocData = toc(content).json;

  return {
    props: {
      frontMatter: frontMatter as PostFrontMatter,
      slug,
      mdxSource,
      tocData,
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
  frontMatter: { title, emoji, date, tags },
  slug,
  mdxSource,
  tocData,
}) => {
  return (
    <div>
      <Head title={title} slug={slug} />
      <div className="flex items-center flex-col w-full my-10 p-10">
        <div className="text-6xl mb-5">{emoji}</div>
        <h1 className="text-3xl font-bold mb-10">{title}</h1>
        <div className="flex space-x-2">
          {tags &&
            tags.map((tag, index) => (
              <p key={index} className="text-gray-500">
                {tag}
              </p>
            ))}
        </div>
        <p className="text-gray-500">{format(new Date(date), 'yyyy/MM/dd')}</p>
      </div>
      <div className="md:flex md:space-x-10">
        <main className="xl:w-3/4 md:w-3/5 p-10 shadow-md rounded-md bg-white">
          <article>
            <MDXRemote {...mdxSource} components={components} />
          </article>
        </main>
        <aside className="xl:w-1/4 md:w-2/5">
          <div className="md:sticky md:top-10 p-10 shadow-md rounded-md bg-white">
            <div className=" text-lg font-bold mb-5">もくじ</div>
            <div className="space-y-3">
              {tocData.map((toc, index) => (
                <div
                  key={index}
                  className={`${
                    toc.lvl === 2 ? 'pl-2' : toc.lvl === 3 ? 'pl-4' : ''
                  }`}
                >
                  <NextLink href={`#${toc.slug}`} scroll={false}>
                    <a>{toc.slug}</a>
                  </NextLink>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostPage;
