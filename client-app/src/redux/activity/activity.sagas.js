import { takeLatest, put, all, call } from "redux-saga/effects";

import agent from "../../api/agent";

import {
  createActivitySuccess,
  createActivityFailure,
  editActivitySuccess,
  editActivityFailure,
  deleteActivitySuccess,
  deleteActivityFailure,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  fetchActivitySuccess,
  fetchActivityFailure,
  attendActivitySuccess,
  unattendActivitySuccess,
  fetchNextSuccess,
  fetchNextFailure,
  setSubmitting,
} from "./activity.actions";

import ActivityTypes from "./activity.types";

export function* fetchActivitiesAsync({ meta: { onExpiredToken } }) {
  try {
    const activitiesEnvelope = yield agent.Activities.list(5, 0);
    const { activities, activityCount } = activitiesEnvelope;
    activities.forEach((activity) => {
      activity.date = new Date(activity.date);
    });
    yield put(fetchActivitiesSuccess(activities, activityCount));
  } catch (error) {
    const { status, headers } = error.response;
    if (
      status === 401 &&
      headers["www-authenticate"].includes('Bearer error="invalid_token"')
    ) {
      window.localStorage.removeItem("jwt");
      yield onExpiredToken();
    }
    yield put(fetchActivitiesFailure(error.message));
  }
}

export function* fetchNextPageAsync({
  payload: { limit, page, isGoing, isHost, startDate },
  meta: { onExpiredToken },
}) {
  try {
    const activitiesEnvelope = yield agent.Activities.list(
      limit,
      page,
      isGoing,
      isHost,
      startDate
    );
    const { activities, activityCount } = activitiesEnvelope;
    activities.forEach((activity) => {
      activity.date = new Date(activity.date);
    });
    yield put(fetchNextSuccess(activities, activityCount, page));
  } catch (error) {
    const { status, headers } = error.response;
    if (
      status === 401 &&
      headers["www-authenticate"].includes('Bearer error="invalid_token"')
    ) {
      window.localStorage.removeItem("jwt");
      onExpiredToken();
    }
    yield put(fetchNextFailure(error.message));
  }
}

export function* fetchActivityAsync({ payload: id, meta: { callback } }) {
  try {
    const activity = yield agent.Activities.details(id);
    activity.date = new Date(activity.date);
    activity.time = new Date(activity.date);
    yield put(fetchActivitySuccess(activity));
  } catch (error) {
    yield put(fetchActivityFailure());
    if (error.message === "Network Error" && !error.response)
      yield callback(undefined, "Make sure you are connected to the network");
    else {
      const {
        response: { status },
      } = error;
      status === 404
        ? yield callback("/notfound")
        : yield callback(undefined, "Error fetching activity");
    }
  }
}

export function* createActivityAsync({
  payload,
  meta: { onSuccess, onError },
}) {
  try {
    const activity = payload;
    activity.comments = [];
    yield agent.Activities.create(activity);
    yield put(setSubmitting(false));
    yield put(
      createActivitySuccess({
        ...payload,
        date: new Date(activity.date),
        time: new Date(activity.date),
      })
    );
    yield onSuccess(payload.id);
  } catch (error) {
    yield put(createActivityFailure());
    if (error.message === "Network Error" && !error.response)
      yield onError(undefined, "Make sure you are connected to the network");
    else {
      const {
        response: { status },
      } = error;
      status === 404
        ? yield onError("/notfound")
        : yield onError(undefined, "Error creating activity");
    }
  }
}

export function* editActivityAsync({ payload, meta: { onSuccess, onError } }) {
  try {
    yield agent.Activities.update(payload);
    yield put(setSubmitting(false));
    yield put(
      editActivitySuccess({
        ...payload,
        date: new Date(payload.date),
        time: new Date(payload.date),
      })
    );
    yield onSuccess(payload.id);
  } catch (error) {
    yield put(editActivityFailure());
    if (error.message === "Network Error" && !error.response)
      yield onError(undefined, "Make sure you are connected to the network");
    else {
      const {
        response: { status },
      } = error;
      status === 404
        ? yield onError("/notfound")
        : yield onError(undefined, "Error editing activity");
    }
  }
}

export function* deleteActivityAsync({ payload: { id }, meta: { onError } }) {
  try {
    yield agent.Activities.delete(id);
    yield put(setSubmitting(false));
    yield put(deleteActivitySuccess(id));
  } catch (error) {
    if (error.message === "Network Error" && !error.response)
      yield onError(undefined, "Make sure you are connected to the network");
    else {
      yield put(deleteActivityFailure(error.message));
    }
  }
}

export function* attendActivityAsync({ payload: { activityId, user } }) {
  try {
    yield agent.Activities.attend(activityId);
    yield put(setSubmitting(false));
    yield put(attendActivitySuccess(activityId, user));
  } catch (error) {}
}

export function* unattendActivityAsync({ payload: { activityId, user } }) {
  try {
    yield agent.Activities.unattend(activityId);
    yield put(setSubmitting(false));
    yield put(unattendActivitySuccess(activityId, user));
  } catch (error) {}
}

export function* fetchActivitiesStart() {
  yield takeLatest(ActivityTypes.FETCH_ACTIVITIES_START, fetchActivitiesAsync);
}

export function* fetchNextPageStart() {
  yield takeLatest(ActivityTypes.FETCH_NEXT_PAGE_START, fetchNextPageAsync);
}

export function* fetchActivityStart() {
  yield takeLatest(ActivityTypes.FETCH_ACTIVITY_START, fetchActivityAsync);
}

export function* createActivityStart() {
  yield takeLatest(ActivityTypes.CREATE_ACTIVITY_START, createActivityAsync);
}

export function* editActivityStart() {
  yield takeLatest(ActivityTypes.EDIT_ACTIVITY_START, editActivityAsync);
}

export function* deleteActivityStart() {
  yield takeLatest(ActivityTypes.DELETE_ACTIVITY_START, deleteActivityAsync);
}

export function* attendActivityStart() {
  yield takeLatest(ActivityTypes.ATTEND_ACTIVITY_START, attendActivityAsync);
}

export function* unattendActivityStart() {
  yield takeLatest(
    ActivityTypes.UNATTEND_ACTIVITY_START,
    unattendActivityAsync
  );
}

export function* activitySagas() {
  yield all([
    call(fetchActivitiesStart),
    call(fetchActivityStart),
    call(createActivityStart),
    call(editActivityStart),
    call(deleteActivityStart),
    call(attendActivityStart),
    call(unattendActivityStart),
    call(fetchNextPageStart),
  ]);
}
