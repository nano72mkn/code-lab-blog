import fs from 'fs';
import path from 'path';

import { format } from 'date-fns';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { mdxComponents } from 'config/mdxComponents';

export async function generateStaticParams() {
  const postsPath = path.join(process.cwd(), 'src/posts');
  const files = fs.readdirSync(postsPath);

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}

export default async function PostPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;

  const postPath = path.join(process.cwd(), 'src/posts', slug + '.mdx');
  const markdownWithMeta = fs.readFileSync(postPath, 'utf-8');

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const { title, emoji, date, update, tags } = frontMatter as PostFrontMatter;
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });

  return (
    <div>
      {/* <Head title={title} slug={slug} /> */}
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
            <MDXRemote {...mdxSource} components={mdxComponents} lazy />
          </article>
        </main>
        {/* <Sidebar content={content} /> */}
      </div>
    </div>
  );
};
