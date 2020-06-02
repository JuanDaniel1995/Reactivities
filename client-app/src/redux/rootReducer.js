import { combineReducers } from "redux";

import activityReducer from "./activity/activity.reducers";
import userReducer from "./user/user.reducers";
import commonReducer from "./common/common.reducers";

const rootReducer = combineReducers({
  activity: activityReducer,
  user: userReducer,
  common: commonReducer,
});

export default rootReducer;
