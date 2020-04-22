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
  setSubmitting,
  setActivity,
} from "./activity.actions";

import ActivityTypes from "./activity.types";

export function* fetchActivitiesAsync() {
  try {
    const activities = yield agent.Activities.list();
    activities.forEach((activity) => {
      activity.date = activity.date.split(".")[0];
    });
    yield put(fetchActivitiesSuccess(activities));
  } catch (error) {
    yield put(fetchActivitiesFailure(error.message));
  }
}

export function* fetchActivityAsync({ payload: id, meta: { callback } }) {
  try {
    const activity = yield agent.Activities.details(id);
    activity.date = activity.date.split(".")[0];
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
    yield agent.Activities.create(payload);
    yield put(setSubmitting(false));
    yield put(createActivitySuccess(payload));
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
    yield put(setActivity(payload));
    yield put(setSubmitting(false));
    yield put(editActivitySuccess(payload));
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

export function* deleteActivityAsync({
  payload: { id },
  meta: { onError },
}) {
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

export function* fetchActivitiesStart() {
  yield takeLatest(ActivityTypes.FETCH_ACTIVITIES_START, fetchActivitiesAsync);
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

export function* activitySagas() {
  yield all([
    call(fetchActivitiesStart),
    call(fetchActivityStart),
    call(createActivityStart),
    call(editActivityStart),
    call(deleteActivityStart),
  ]);
}
