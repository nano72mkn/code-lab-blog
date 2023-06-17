"use client";

import { mdxComponents } from "config/mdxComponents";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FC } from "react";

interface Props {
    mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const Article: FC<Props> = ({ mdxSource }) => {
  return (
    <article>
      <MDXRemote {...mdxSource} components={mdxComponents} lazy />
    </article>
  );
};
