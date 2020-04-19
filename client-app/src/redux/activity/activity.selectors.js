import { createSelector } from "reselect";

const activity = (state) => state.activity;

export const selectActivities = createSelector(
  [activity],
  (activity) => activity.activities
);

export const selectActivitiesByDate = createSelector(
  [selectActivities],
  (activities) =>
    activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
);

export const selectActivitiesGroupedByDate = createSelector(
  [selectActivities],
  (activities) =>
    Object.entries(
      activities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {})
    )
);

export const selectIsActivityFetching = createSelector(
  [activity],
  (activity) => activity.isFetching
);

export const selectActivity = createSelector(
  [activity],
  (activity) => activity.activity
);

export const selectActivityId = createSelector(
  [selectActivity],
  (activity) => (activity && activity.id) || 0
);

export const selectEditMode = createSelector(
  [activity],
  (activity) => activity.editMode
);

export const selectSubmitting = createSelector(
  [activity],
  (activity) => activity.submitting
);

export const selectTarget = createSelector(
  [activity],
  (activity) => activity.target
);
