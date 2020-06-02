import { takeLatest, put, all, call } from "redux-saga/effects";

import agent from "../../api/agent";

import { retrieveUserSuccess } from "./user.actions";
import { setAppLoaded } from "../common/common.actions";

import UserTypes from "./user.types";

export function* retrieveUser() {
  try {
    const user = yield agent.User.current();
    yield put(retrieveUserSuccess(user));
  } catch (error) {
  } finally {
    yield put(setAppLoaded());
  }
}

export function* retrieveUserStart() {
  yield takeLatest(UserTypes.RETRIEVE_USER_START, retrieveUser);
}

export function* userSagas() {
  yield all([call(retrieveUserStart)]);
}
