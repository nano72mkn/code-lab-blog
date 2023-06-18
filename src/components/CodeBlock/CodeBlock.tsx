import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import hybrid from 'react-syntax-highlighter/dist/cjs/styles/hljs/hybrid';

export const CodeBlock = (props: any) => {
  const { className, children } = props;

  const match = /language-(\w+):(.*)/.exec(className || '');
  const lang = match ? match[1] : '';
  const name = match ? match[2] : '';

  return (
    <div className="my-5 shadow-md">
      {name && (
        <div className="rounded-t-md bg-gray-200 px-3 py-2 text-gray-600">
          {name}
        </div>
      )}
      <SyntaxHighlighter
        style={hybrid}
        language={lang}
        wrapLongLines
        className={`text-sm p-5 rounded-md ${name ? 'rounded-t-none' : ''}`}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};
