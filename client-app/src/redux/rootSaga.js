import { all, call } from "redux-saga/effects";

import { activitySagas } from "./activity/activity.sagas";

export default function* rootSaga() {
  yield all([call(activitySagas)]);
}
