import ActivityTypes from "./activity.types";

export const fetchActivitiesStart = () => ({
  type: ActivityTypes.FETCH_ACTIVITIES_START,
});

export const fetchActivitiesSuccess = (activities) => ({
  type: ActivityTypes.FETCH_ACTIVITIES_SUCCESS,
  payload: activities,
});

export const fetchActivitiesFailure = (errorMessage) => ({
  type: ActivityTypes.FETCH_ACTIVITIES_FAILURE,
  payload: errorMessage,
});

export const createActivityStart = (activity) => ({
  type: ActivityTypes.CREATE_ACTIVITY_START,
  payload: activity,
});

export const createActivitySuccess = (activity) => ({
  type: ActivityTypes.CREATE_ACTIVITY_SUCCESS,
  payload: activity,
});

export const createActivityFailure = (errorMessage) => ({
  type: ActivityTypes.CREATE_ACTIVITY_FAILURE,
  payload: errorMessage,
});

export const editActivityStart = (activity) => ({
  type: ActivityTypes.EDIT_ACTIVITY_START,
  payload: activity,
});

export const editActivitySuccess = (activity) => ({
  type: ActivityTypes.EDIT_ACTIVITY_SUCCESS,
  payload: activity,
});

export const editActivityFailure = (errorMessage) => ({
  type: ActivityTypes.EDIT_ACTIVITY_FAILURE,
  payload: errorMessage,
});

export const deleteActivityStart = (target, id) => ({
  type: ActivityTypes.DELETE_ACTIVITY_START,
  payload: { target, id },
});

export const deleteActivitySuccess = (id) => ({
  type: ActivityTypes.DELETE_ACTIVITY_SUCCESS,
  payload: id,
});

export const deleteActivityFailure = (errorMessage) => ({
  type: ActivityTypes.DELETE_ACTIVITY_FAILURE,
  payload: errorMessage,
});

export const selectActivity = (activity) => ({
  type: ActivityTypes.SET_SELECTED_ACTIVITY,
  payload: activity,
});

export const setEditMode = (mode) => ({
  type: ActivityTypes.SET_EDIT_MODE,
  payload: mode,
});

export const setSubmitting = (submitting) => ({
  type: ActivityTypes.SET_SUBMITTING,
  payload: submitting,
});

export const openCreateForm = () => ({
  type: ActivityTypes.OPEN_CREATE_FORM,
});
