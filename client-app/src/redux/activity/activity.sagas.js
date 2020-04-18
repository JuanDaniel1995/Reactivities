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

export function* fetchActivityAsync({ payload: id }) {
  try {
    const activity = yield agent.Activities.details(id);
    activity.date = activity.date.split(".")[0];
    yield put(fetchActivitySuccess(activity));
  } catch (error) {
    yield put(fetchActivityFailure(error.message));
  }
}

export function* createActivityAsync({ payload, meta: { callback } }) {
  try {
    yield agent.Activities.create(payload);
    yield put(setSubmitting(false));
    yield put(createActivitySuccess(payload, callback));
  } catch (error) {
    yield put(createActivityFailure(error.message));
  }
}

export function* postCreateActivity({ meta: { callback } }) {
  try {
    yield put(callback());
  } catch (error) {
    yield put(createActivityFailure(error.message));
  }
}
export function* postEditActivity({ meta: { callback } }) {
  try {
    yield put(callback());
  } catch (error) {
    yield put(createActivityFailure(error.message));
  }
}

export function* editActivityAsync({ payload, meta: { callback } }) {
  try {
    yield agent.Activities.update(payload);
    yield put(setActivity(payload));
    yield put(setSubmitting(false));
    yield put(editActivitySuccess(payload, callback));
  } catch (error) {
    yield put(editActivityFailure(error.message));
  }
}

export function* deleteActivityAsync({ payload: { id } }) {
  try {
    yield agent.Activities.delete(id);
    yield put(setSubmitting(false));
    yield put(deleteActivitySuccess(id));
  } catch (error) {
    yield put(deleteActivityFailure(error.message));
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

export function* createActivityFinished() {
  yield takeLatest(ActivityTypes.CREATE_ACTIVITY_SUCCESS, postCreateActivity);
}

export function* editActivityStart() {
  yield takeLatest(ActivityTypes.EDIT_ACTIVITY_START, editActivityAsync);
}

export function* editActivityFinished() {
  yield takeLatest(ActivityTypes.EDIT_ACTIVITY_SUCCESS, postEditActivity);
}

export function* deleteActivityStart() {
  yield takeLatest(ActivityTypes.DELETE_ACTIVITY_START, deleteActivityAsync);
}

export function* activitySagas() {
  yield all([
    call(fetchActivitiesStart),
    call(fetchActivityStart),
    call(createActivityStart),
    call(createActivityFinished),
    call(editActivityStart),
    call(deleteActivityStart),
  ]);
}
