import fs from 'fs';
import path from 'path';

import React from 'react';

import { format } from 'date-fns';
import matter from 'gray-matter';
import toc from 'markdown-toc';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { CodeBlock } from 'components/CodeBlock';
import { Head } from 'components/Head';
import { Link } from 'components/Link';
import { Sidebar } from 'components/Sidebar';

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
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });

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
    <h1 {...props} className="text-3xl font-bold mt-14 mb-10 pb-3 border-b-2" />
  ),
  h2: (props) => <h2 {...props} className="text-2xl font-bold mt-10 mb-5" />,
  h3: (props) => <h3 {...props} className="text-xl font-bold  mt-7 mb-3" />,
  h4: (props) => (
    <h4
      {...props}
      id={props.children?.toString()}
      className="text-xl font-bold  mt-7 mb-3"
    />
  ),
  h5: (props) => <h5 {...props} className="font-bold mt-7 mb-3" />,
  h6: (props) => <h6 {...props} className="font-bold mt-7 mb-3" />,
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
  hr: (props) => <hr className="my-10" {...props} />,
  table: (props) => (
    <div className="my-10 rounded-md overflow-hidden border border-gray-300">
      <table className="w-full " {...props} />
    </div>
  ),
  th: (props) => (
    <th className="px-6 py-5 bg-gray-200 text-sm text-left" {...props} />
  ),
  td: (props) => <td className="px-6 py-3" {...props} />,
  tr: (props) => (
    <tr className="border-b border-gray-300 last:border-0" {...props} />
  ),
};

const PostPage: NextPage<Props> = ({
  frontMatter: { title, emoji, date, update, tags },
  slug,
  mdxSource,
  tocData,
}) => {
  return (
    <div>
      <Head title={title} slug={slug} />
      <div className="flex items-center flex-col w-full my-5 p-5">
        <div className="text-6xl mb-5">{emoji}</div>
        <h1 className="text-3xl font-bold mb-5 text-center">{title}</h1>
        <div className="flex space-x-2">
          {tags &&
            tags.map((tag, index) => (
              <p key={index} className="text-gray-500">
                {tag}
              </p>
            ))}
        </div>
        <div className="flex space-x-3">
          <p className="text-gray-500 p-0">
            公開：
            <time
              title={format(new Date(date), 'yyyy/MM/dd')}
              dateTime={format(new Date(date), 'yyyy-MM-dd')}
            >
              {format(new Date(date), 'yyyy/MM/dd')}
            </time>
          </p>

          {update && (
            <p className="text-gray-500">
              更新：
              <time
                title={format(new Date(update), 'yyyy/MM/dd')}
                dateTime={format(new Date(update), 'yyyy-MM-dd')}
              >
                {format(new Date(update), 'yyyy/MM/dd')}
              </time>
            </p>
          )}
        </div>
      </div>
      <div className="lg:flex lg:space-x-5">
        <main className="lg:w-3/4 mb-10 xl:mb-0 p-10 xl:p-10  shadow-md rounded-md bg-white">
          <article>
            <MDXRemote {...mdxSource} components={components} lazy />
          </article>
        </main>
        <Sidebar tocData={tocData} />
      </div>
    </div>
  );
};

export default PostPage;
