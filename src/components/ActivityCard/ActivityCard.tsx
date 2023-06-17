import { format, formatDistanceToNow, subYears } from 'date-fns';
import Image from 'next/image';

import { ActivityType } from 'types/TimelineTypes';

interface ActivityCardProps {
  activity: ActivityType;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <a
      className="p-5 rounded-sm shadow-lg block transition hover:shadow-md hover:bg-gray-100"
      href={activity.link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-center mb-2 overflow-hidden">
        <span className="flex items-center mr-2 w-4 h-4">
          <Image
            src={activity.favicon}
            width={15}
            height={15}
            className="w-4 h-4"
            alt="favicon"
          />
        </span>
        <p className="font-bold break-all flex-1">{activity.title}</p>
      </div>
      <p className="text-sm text-gray-900/50">
        {subYears(new Date(), 1) > new Date(activity.isoDate)
          ? format(new Date(activity.isoDate), 'yyyy/MM/dd')
          : formatDistanceToNow(new Date(activity.isoDate), {
              includeSeconds: true,
              addSuffix: true,
            })}
      </p>
    </a>
  );
};
