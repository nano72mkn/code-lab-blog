"use client";
// import toc from 'markdown-toc';

import { Author } from 'components/Author';
import { Sns } from 'components/Sns';

interface Props {
  content: string;
}

export const Sidebar: React.FC<Props> = () => {
  // const tocData = toc(content).json;
  return (
    <aside className="space-y-5 xl:w-1/4 ">
      <Author />

      <Sns />
      {/* {tocData && (
        <div className="md:sticky md:top-10 p-10 shadow-md rounded-md bg-white">
          <div className=" text-lg font-bold mb-5">もくじ</div>
          <ul className="space-y-3 pl-5">
            {tocData.map((toc, index) => (
              <li
                key={index}
                className={`${
                  toc.lvl === 2
                    ? 'pl-1'
                    : toc.lvl === 3
                    ? 'pl-4 text-gray-600'
                    : ''
                } ${toc.lvl === 1 ? 'list-disc' : ''}`}
              >
                <a
                  href={`#${toc.slug}`}
                  className={`text-sm ${toc.lvl === 1 && 'font-bold'}`}
                >
                  {toc.content}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </aside>
  );
};
