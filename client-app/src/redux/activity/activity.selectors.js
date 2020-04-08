import { createSelector } from "reselect";

const selectActivity = (state) => state.activity;

export const selectActivities = createSelector(
  [selectActivity],
  (activity) => activity.activities
);

export const selectActivitiesByDate = createSelector(
  [selectActivities],
  (activities) =>
    activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
);

export const selectIsActivityFetching = createSelector(
  [selectActivity],
  (activity) => activity.isFetching
);

export const selectedActivity = createSelector(
  [selectActivity],
  (activity) => activity.selectedActivity
);

export const selectedActivityId = createSelector(
  [selectedActivity],
  (activity) => (activity && activity.id) || 0
);

export const selectEditMode = createSelector(
  [selectActivity],
  (activity) => activity.editMode
);

export const selectSubmitting = createSelector(
  [selectActivity],
  (activity) => activity.submitting
);

export const selectTarget = createSelector(
  [selectActivity],
  (activity) => activity.target
);
