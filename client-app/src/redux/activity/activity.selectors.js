import { createSelector } from "reselect";

const activity = (state) => state.activity;

export const selectActivities = createSelector(
  [activity],
  (activity) => activity.activities
);

export const selectActivitiesByDate = createSelector(
  [selectActivities],
  (activities) => activities.sort((a, b) => a.date.getTime() - b.date.getTime())
);

export const selectActivitiesGroupedByDate = createSelector(
  [selectActivitiesByDate],
  (activities) =>
    Object.entries(
      activities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, [])
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
export const selectActivityCount = createSelector(
  [activity],
  (activity) => activity.activityCount
);
export const selectPage = createSelector(
  [activity],
  (activity) => activity.page
);
export const selectLimit = createSelector(
  [activity],
  (activity) => activity.limit
);
export const selectIsGoing = createSelector(
  [activity],
  (activity) => activity.isGoing
);
export const selectIsHost = createSelector(
  [activity],
  (activity) => activity.isHost
);
export const selectStartDate = createSelector(
  [activity],
  (activity) => activity.startDate
);
export const selectIsFetchingNext = createSelector(
  [activity],
  (activity) => activity.isFetchingNext
);
export const selectFilterChanged = createSelector(
  [activity],
  (activity) => activity.filterChanged
);
export const selectTotalPages = createSelector([activity], (activity) => {
  const pages = Math.ceil(activity.activityCount / activity.limit);
  return pages;
});
