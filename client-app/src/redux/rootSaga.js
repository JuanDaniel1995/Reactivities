import { all, call } from "redux-saga/effects";

import { activitySagas } from "./activity/activity.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(activitySagas), call(userSagas)]);
}
