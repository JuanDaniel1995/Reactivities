import ActivityTypes from "./activity.types";

export const fetchActivitiesStart = () => ({
  type: ActivityTypes.FETCH_ACTIVITIES_START,
});
export const fetchActivitiesSuccess = (activities, activityCount) => ({
  type: ActivityTypes.FETCH_ACTIVITIES_SUCCESS,
  payload: { activities, activityCount },
});
export const fetchActivitiesFailure = () => ({
  type: ActivityTypes.FETCH_ACTIVITIES_FAILURE,
});
export const fetchActivityStart = (id, callback) => ({
  type: ActivityTypes.FETCH_ACTIVITY_START,
  payload: id,
  meta: {
    callback: callback,
  },
});
export const fetchActivitySuccess = (activity) => ({
  type: ActivityTypes.FETCH_ACTIVITY_SUCCESS,
  payload: activity,
});
export const fetchActivityFailure = () => ({
  type: ActivityTypes.FETCH_ACTIVITY_FAILURE,
});
export const createActivityStart = (activity, onSuccess, onError) => ({
  type: ActivityTypes.CREATE_ACTIVITY_START,
  payload: activity,
  meta: {
    onSuccess,
    onError,
  },
});
export const createActivitySuccess = (activity) => ({
  type: ActivityTypes.CREATE_ACTIVITY_SUCCESS,
  payload: activity,
});
export const createActivityFailure = (errorMessage) => ({
  type: ActivityTypes.CREATE_ACTIVITY_FAILURE,
  payload: errorMessage,
});
export const editActivityStart = (activity, onSuccess, onError) => ({
  type: ActivityTypes.EDIT_ACTIVITY_START,
  payload: activity,
  meta: {
    onSuccess,
    onError,
  },
});
export const editActivitySuccess = (activity) => ({
  type: ActivityTypes.EDIT_ACTIVITY_SUCCESS,
  payload: activity,
});
export const editActivityFailure = (errorMessage) => ({
  type: ActivityTypes.EDIT_ACTIVITY_FAILURE,
  payload: errorMessage,
});
export const deleteActivityStart = (target, id, onError) => ({
  type: ActivityTypes.DELETE_ACTIVITY_START,
  payload: { target, id },
  meta: {
    onError,
  },
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
export const setSubmitting = (submitting) => ({
  type: ActivityTypes.SET_SUBMITTING,
  payload: submitting,
});
export const setFetching = (fetching) => ({
  type: ActivityTypes.SET_FETCHING,
  payload: fetching,
});
export const attendActivityStart = (activityId, user) => ({
  type: ActivityTypes.ATTEND_ACTIVITY_START,
  payload: { activityId, user },
});
export const attendActivitySuccess = (activityId, user) => ({
  type: ActivityTypes.ATTEND_ACTIVITY_SUCCESS,
  payload: { activityId, user },
});
export const unattendActivityStart = (activityId, user) => ({
  type: ActivityTypes.UNATTEND_ACTIVITY_START,
  payload: { activityId, user },
});
export const unattendActivitySuccess = (activityId, user) => ({
  type: ActivityTypes.UNATTEND_ACTIVITY_SUCCESS,
  payload: { activityId, user },
});
export const addComment = (activityId, comment) => ({
  type: ActivityTypes.ADD_COMMENT_START,
  payload: { activityId, comment },
});
export const addCommentSuccess = (activityId, comment) => ({
  type: ActivityTypes.ADD_COMMENT_SUCCESS,
  payload: { activityId, comment },
});
export const addCommentFailure = () => ({
  type: ActivityTypes.ADD_COMMENT_FAILURE,
});
export const fetchNext = (limit, page, isGoing, isHost, startDate) => {
  return {
    type: ActivityTypes.FETCH_NEXT_PAGE_START,
    payload: { limit, page, isGoing, isHost, startDate },
  };
};
export const fetchNextSuccess = (activities, activityCount, page) => ({
  type: ActivityTypes.FETCH_NEXT_PAGE_SUCCESS,
  payload: { activities, activityCount, page },
});
export const fetchNextFailure = () => ({
  type: ActivityTypes.FETCH_NEXT_PAGE_FAILURE,
});
export const setIsGoing = () => ({
  type: ActivityTypes.SET_IS_GOING,
});
export const setIsHost = () => ({
  type: ActivityTypes.SET_IS_HOST,
});
export const setStartDate = (startDate) => ({
  type: ActivityTypes.SET_START_DATE,
  payload: startDate,
});
export const resetInitial = () => ({
  type: ActivityTypes.RESET_INITIAL,
});
