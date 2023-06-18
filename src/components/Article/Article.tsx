import { FC, Suspense } from "react";

// import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';

// import { mdxComponents } from "config/mdxComponents";

interface Props {
  // mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
//   mdxSource: string;
}

export const Article: FC<Props> = () => {
  return (
    <article>
      <Suspense fallback={<>Loading...</>}>
        {/* <MDXRemote {...mdxSource} components={mdxComponents} /> */}
      </Suspense>
    </article>
  );
};
