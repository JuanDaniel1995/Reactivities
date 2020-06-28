import { takeLatest, put, all, call } from "redux-saga/effects";

import agent from "../../api/agent";

import {
  fetchProfileSuccess,
  fetchProfileFailure,
  setMainPhotoSuccess,
  setMainPhotoFailure,
  deletePhotoSuccess,
  deletePhotoFailure,
} from "./profiles.actions";

import { setImage } from "../user/user.actions";

import ProfilesTypes from "./profiles.types";

export function* setMainPhotoAsync({ payload: photo }) {
  try {
    const { id, url } = photo;
    yield agent.Profiles.setMainPhoto(id);
    yield put(setMainPhotoSuccess(id));
    yield put(setImage(url));
  } catch (error) {
    yield put(setMainPhotoFailure());
  }
}

export function* deletePhotoAsync({ payload: id }) {
  try {
    yield agent.Profiles.deletePhoto(id);
    yield put(deletePhotoSuccess(id));
  } catch (error) {
    yield put(deletePhotoFailure());
  }
}

export function* fetchProfileAsync({ payload: user }) {
  try {
    const profile = yield agent.Profiles.get(user);
    yield put(fetchProfileSuccess(profile));
  } catch (error) {
    yield put(fetchProfileFailure());
  }
}

export function* deletePhotoStart() {
  yield takeLatest(ProfilesTypes.DELETE_PHOTO_START, deletePhotoAsync);
}

export function* setMainPhotoStart() {
  yield takeLatest(ProfilesTypes.SET_MAIN_PHOTO_START, setMainPhotoAsync);
}

export function* fetchProfileStart() {
  yield takeLatest(ProfilesTypes.RETRIEVE_PROFILE_START, fetchProfileAsync);
}

export function* profilesSagas() {
  yield all([
    call(fetchProfileStart),
    call(setMainPhotoStart),
    call(deletePhotoStart),
  ]);
}
