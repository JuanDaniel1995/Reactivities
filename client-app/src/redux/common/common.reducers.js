import CommonTypes from "./common.types";

const INITIAL_STATE = {
  appLoaded: false,
};

const commonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommonTypes.SET_APP_LOADED:
      return {
        ...state,
        appLoaded: !state.appLoaded,
      };
    default:
      return state;
  }
};

export default commonReducer;
