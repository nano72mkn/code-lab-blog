import { getActivity } from './getActivity';

import type { ActivityType, Url } from 'types/TimelineTypes';

export interface GetActivitiesProps {
  urls: Url[];
}

export const getActivities = async ({
  urls,
}: GetActivitiesProps): Promise<ActivityType[]> => {
  const activities = await Promise.all(
    urls.map(async (url) => await getActivity({ url })),
  );
  const activitiesMerge = activities.flat();
  return activitiesMerge.sort((a, b) =>
    new Date(a.isoDate) < new Date(b.isoDate) ? 1 : -1,
  );
};
