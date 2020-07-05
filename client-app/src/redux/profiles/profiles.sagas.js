import { takeLatest, put, all, call } from "redux-saga/effects";

import agent from "../../api/agent";

import {
  fetchProfileSuccess,
  fetchProfileFailure,
  setMainPhotoSuccess,
  setMainPhotoFailure,
  deletePhotoSuccess,
  deletePhotoFailure,
  updateProfileSuccess,
  updateProfileFailure,
  followProfileSuccess,
  followProfileFailure,
  unfollowProfileSuccess,
  unfollowProfileFailure,
  fetchFollowingsSuccess,
  fetchFollowingsFailure,
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

export function* updateProfileAsync({ payload: profile }) {
  try {
    yield agent.Profiles.updateProfile(profile);
    yield put(updateProfileSuccess(profile));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export function* followProfileAsync({ payload: username }) {
  try {
    yield agent.Profiles.follow(username);
    yield put(followProfileSuccess(username));
  } catch (error) {
    yield put(followProfileFailure());
  }
}

export function* unfollowProfileAsync({ payload: username }) {
  try {
    yield agent.Profiles.unfollow(username);
    yield put(unfollowProfileSuccess(username));
  } catch (error) {
    yield put(unfollowProfileFailure());
  }
}

export function* fetchFollowingsAsync({ payload: { username, predicate } }) {
  try {
    const profiles = yield agent.Profiles.listFollowings(username, predicate);
    yield put(fetchFollowingsSuccess(profiles));
  } catch (error) {
    yield put(fetchFollowingsFailure());
  }
}

export function* fetchFollowingsStart() {
  yield takeLatest(
    ProfilesTypes.RETRIEVE_FOLLOWINGS_START,
    fetchFollowingsAsync
  );
}

export function* unfollowProfileStart() {
  yield takeLatest(ProfilesTypes.UNFOLLOW_PROFILE_START, unfollowProfileAsync);
}

export function* followProfileStart() {
  yield takeLatest(ProfilesTypes.FOLLOW_PROFILE_START, followProfileAsync);
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

export function* updateProfileStart() {
  yield takeLatest(ProfilesTypes.UPDATE_PROFILE_START, updateProfileAsync);
}

export function* profilesSagas() {
  yield all([
    call(fetchProfileStart),
    call(setMainPhotoStart),
    call(deletePhotoStart),
    call(updateProfileStart),
    call(followProfileStart),
    call(unfollowProfileStart),
    call(fetchFollowingsStart),
  ]);
}
