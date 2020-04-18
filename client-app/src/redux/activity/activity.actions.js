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
export const fetchActivityStart = (id) => ({
  type: ActivityTypes.FETCH_ACTIVITY_START,
  payload: id,
});
export const fetchActivitySuccess = (activity) => ({
  type: ActivityTypes.FETCH_ACTIVITY_SUCCESS,
  payload: activity,
});
export const fetchActivityFailure = (errorMessage) => ({
  type: ActivityTypes.FETCH_ACTIVITY_FAILURE,
  payload: errorMessage,
});
export const createActivityStart = (activity, callback) => ({
  type: ActivityTypes.CREATE_ACTIVITY_START,
  payload: activity,
  meta: {
    callback: callback,
  },
});
export const createActivitySuccess = (activity, callback) => ({
  type: ActivityTypes.CREATE_ACTIVITY_SUCCESS,
  payload: activity,
  meta: {
    callback: callback,
  },
});
export const createActivityFailure = (errorMessage) => ({
  type: ActivityTypes.CREATE_ACTIVITY_FAILURE,
  payload: errorMessage,
});
export const editActivityStart = (activity, callback) => ({
  type: ActivityTypes.EDIT_ACTIVITY_START,
  payload: activity,
  meta: {
    callback: callback,
  },
});
export const editActivitySuccess = (activity, callback) => ({
  type: ActivityTypes.EDIT_ACTIVITY_SUCCESS,
  payload: activity,
  meta: {
    callback: callback,
  },
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
export const setActivity = (activity) => ({
  type: ActivityTypes.SET_SELECTED_ACTIVITY,
  payload: activity,
});
export const clearActivity = () => ({
  type: ActivityTypes.CLEAR_ACTIVITY,
});
export const setSubmitting = (submitting) => ({
  type: ActivityTypes.SET_SUBMITTING,
  payload: submitting,
});
export const setFetching = (fetching) => ({
  type: ActivityTypes.SET_FETCHING,
  payload: fetching,
});
export const openCreateForm = () => ({
  type: ActivityTypes.OPEN_CREATE_FORM,
});
