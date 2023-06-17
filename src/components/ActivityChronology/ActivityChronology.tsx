import { Activities } from 'components/Activities';
import { ActivityChronology as ActivityChronologyType } from 'utils/groupByYear';

interface ActivityChronologyProps {
  activityChronology: ActivityChronologyType;
}

export const ActivityChronology: React.FC<ActivityChronologyProps> = ({
  activityChronology,
}) => {
  const { year, activities } = activityChronology;
  return (
    <div className="relative ml-20 pb-20 border-l border-gray-200">
      <p className="sticky top-3.5 font-bold -mt-5 -ml-16">{year}</p>
      <div className="ml-5 md:ml-10">
        <Activities activities={activities} />
      </div>
    </div>
  );
};
