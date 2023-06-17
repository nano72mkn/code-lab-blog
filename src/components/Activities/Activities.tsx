import { ActivityCard } from 'components/ActivityCard';

import { ActivityType } from 'types/TimelineTypes';

interface ActivitiesProps {
  activities: ActivityType[];
}

export const Activities: React.FC<ActivitiesProps> = ({ activities }) => {
  return (
    <div className="space-y-5">
      {activities.map((activity, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-5 md:-left-10 top-1/2 -mt-1 -ml-1 w-2 h-2 bg-gray-200 rounded-full" />
          <ActivityCard activity={activity} />
        </div>
      ))}
    </div>
  );
};
