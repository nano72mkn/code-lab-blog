import { format, formatDistanceToNow, subYears } from 'date-fns';

export const PostCard: React.FC<Post> = ({ slug, frontMatter }) => {
  const { title, date, tags, emoji } = frontMatter;
  return (
    <article className="block w-full p-5 shadow-xl bg-white transition hover:shadow-md hover:opacity-80 rounded-sm">
      <a href={`/posts/${slug}`}>
        <div className="w-full mb-5 p-5 text-6xl bg-gray-100 text-center">
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
        <p className="text-md mb-5">{title}</p>
        <time
          className="text-sm text-gray-900/50"
          title={format(new Date(date), 'yyyy/MM/dd')}
          dateTime={format(new Date(date), 'yyyy-MM-dd')}
        >
          {subYears(new Date(), 1) > new Date(date)
            ? format(new Date(date), 'yyyy/MM/dd')
            : formatDistanceToNow(new Date(date), {
                includeSeconds: true,
                addSuffix: true,
              })}
        </time>
      </a>
    </article>
  );
};
