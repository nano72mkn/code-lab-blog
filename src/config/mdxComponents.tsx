import { MDXRemoteProps } from "next-mdx-remote";
import Link from "next/link";

import { CodeBlock } from "components/CodeBlock";

export const mdxComponents: MDXRemoteProps['components'] = {
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
  a: (props) => <Link href={props.href ?? ''}>{props.children}</Link>,
  link: (props) => <Link href={props.href ?? ''}>{props.children}</Link>,
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
