import { ActivityChronology } from "components/ActivityChronology";

import { sites } from "config/sites";
import { getActivities } from "utils/getActivities";
import { groupByYear } from "utils/groupByYear";

export default async function Page() {
  const activityChronologies = groupByYear({
    activities: await getActivities({ urls: sites }),
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">Timeline</h2>
      <div
        className="py-10"
      >
        {activityChronologies.map((activityChronology, index) => (
          <ActivityChronology
            key={index}
            activityChronology={activityChronology}
          />
        ))}
      </div>
    </div>
  );
};
