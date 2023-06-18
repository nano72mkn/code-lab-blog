import { format, formatDistanceToNow, subYears } from 'date-fns';

import { Post } from 'types/PostType';

export const PostCard: React.FC<Post> = ({ slug, frontMatter }) => {
  const { title, date, tags, emoji } = frontMatter;
  return (
    <a href={`/posts/${slug}`}>
      <article className="flex flex-col w-full h-full p-5 shadow-xl bg-white transition hover:shadow-md hover:opacity-80 rounded-md">
        <div className="w-full mb-5 p-5 text-6xl bg-gray-100 text-center rounded-md">
          {emoji}
        </div>
        <div className="mb-2 flex space-x-2">
          {tags &&
            tags.map((tag, index) => (
              <p key={index} className="text-xs text-gray-400 m-0">
                {tag}
              </p>
            ))}
        </div>
        <div className="flex-1">
          <p className="text-md mb-5">{title}</p>
        </div>
        <time
          className="text-sm text-gray-900/50"
          title={format(new Date(date), 'yyyy/MM/dd')}
          dateTime={format(new Date(date), 'yyyy-MM-dd')}
        >
          {subYears(new Date(), 1) > new Date(date)
            ? format(new Date(date), 'yyyy / MM / dd')
            : formatDistanceToNow(new Date(date), {
                includeSeconds: true,
                addSuffix: true,
              })}
        </time>
      </article>
    </a>
  );
};
