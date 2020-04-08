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
  setEditMode,
  setSubmitting,
  selectActivity,
} from "./activity.actions";

import ActivityTypes from "./activity.types";

export function* fetchActivitiesAsync() {
  try {
    const activities = yield agent.Activities.list();
    yield put(fetchActivitiesSuccess(activities));
  } catch (error) {
    yield put(fetchActivitiesFailure(error.message));
  }
}

export function* createActivityAsync({ payload }) {
  try {
    yield agent.Activities.create(payload);
    yield put(selectActivity(payload));
    yield put(setEditMode(false));
    yield put(setSubmitting(false));
    yield put(createActivitySuccess(payload));
  } catch (error) {
    yield put(createActivityFailure(error.message));
  }
}

export function* editActivityAsync({ payload }) {
  try {
    yield agent.Activities.update(payload);
    yield put(selectActivity(payload));
    yield put(setEditMode(false));
    yield put(setSubmitting(false));
    yield put(editActivitySuccess(payload));
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
    call(createActivityStart),
    call(editActivityStart),
    call(deleteActivityStart),
  ]);
}
