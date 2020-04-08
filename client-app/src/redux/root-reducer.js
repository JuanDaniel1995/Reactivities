import { combineReducers } from "redux";

import activityReducer from "./activity/activity.reducers";

const rootReducer = combineReducers({ activity: activityReducer });

export default rootReducer;
