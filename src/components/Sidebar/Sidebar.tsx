import { useEffect, useState } from 'react';

import toc from 'markdown-toc';

import { Author } from 'components/Author';
import { Sns } from 'components/Sns';

interface Props {
  tocData: ReturnType<typeof toc>['json'];
}

export const Sidebar: React.FC<Props> = ({ tocData }) => {
  const [selectId, setSelectId] = useState<string | null>(null);
  useEffect(() => {
    if (document === undefined) return;
    const slugs = tocData.map((v) => v.slug);

    const options = {
      root: null,
      rootMargin: '0px 0px -80% 0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      if (!isIntersecting) return;

      const id = entries[0].target.id;
      setSelectId(id);
    }, options);

    slugs.forEach((slug) => {
      const target = document.getElementById(slug);
      if (target === null) return;
      observer.observe(target);
    });

    return () => {
      slugs.forEach((slug) => {
        const target = document.getElementById(slug);
        if (target === null) return;
        observer.unobserve(target);
      });
    };
  }, [tocData]);

  return (
    <aside className="space-y-5 xl:w-1/4 ">
      <Author />

      <Sns />
      {tocData && (
        <div className="md:sticky md:top-10 p-10 shadow-md rounded-md bg-white">
          <div className=" text-lg font-bold mb-5">もくじ</div>
          <ul className="pl-5">
            {tocData.map((toc, index) => (
              <li
                key={index}
                className={`py-2 px-3 rounded-md text-gray-600 ${
                  toc.lvl === 2 ? 'pl-1' : toc.lvl === 3 ? 'pl-4' : ''
                } ${toc.lvl === 1 ? 'list-disc' : ''} ${
                  selectId === toc.slug && 'bg-blue-50 text-gray-900 font-bold'
                }`}
              >
                <a href={`#${toc.slug}`} className="text-sm">
                  {toc.content}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};
