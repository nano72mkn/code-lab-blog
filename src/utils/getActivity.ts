import Parser from 'rss-parser';

import type { ActivityType, Url } from 'types/TimelineTypes';

export interface GetActivityProps {
  url: Url;
}

const parser = new Parser();

export const getActivity = async ({
  url,
}: GetActivityProps): Promise<ActivityType[]> => {
  const feed = await parser.parseURL(url);

  if (!feed?.items?.length) return [];

  const activities = feed.items.map(
    ({ title, contentSnippet, link, isoDate }) => ({
      title,
      contentSnippet: contentSnippet ? contentSnippet.replace(/\n/g, '') : '',
      link,
      isoDate,
      year: isoDate?.split('-')[0],
      favicon: `http://www.google.com/s2/favicons?sz=32&domain=https://${
        new URL(url).hostname
      }`,
    }),
  );

  return activities.filter(
    ({ title, link, isoDate }) => title && link && isoDate,
  ) as ActivityType[];
};
