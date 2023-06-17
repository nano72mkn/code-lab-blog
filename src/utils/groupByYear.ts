import { ActivityType } from 'types/TimelineTypes';

interface Props {
  activities: ActivityType[];
}

export type ActivityChronology = {
  year: ActivityType['year'];
  activities: ActivityType[];
};

export const groupByYear = ({ activities }: Props): ActivityChronology[] => {
  const data = activities.reduce(
    (obj, current) => {
      if (!obj[current.year]) {
        obj = {
          ...obj,
          [current.year]: [],
        };
      }
      obj[current.year].push(current);

      return obj;
    },
    {} as {
      [key in ActivityType['year']]: ActivityType[];
    },
  );

  return Object.keys(data)
    .sort((a, b) => (parseInt(a) - parseInt(b) ? -1 : 1))
    .map((year) => ({ activities: data[year], year }));
};
