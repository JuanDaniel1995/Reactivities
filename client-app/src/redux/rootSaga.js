import { all, call } from "redux-saga/effects";

import { activitySagas } from "./activity/activity.sagas";
import { userSagas } from "./user/user.sagas";
import { profilesSagas } from "./profiles/profiles.sagas";

export default function* rootSaga() {
  yield all([call(activitySagas), call(userSagas), call(profilesSagas)]);
}
