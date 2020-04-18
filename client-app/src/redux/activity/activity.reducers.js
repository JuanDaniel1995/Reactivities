import ActivityTypes from "./activity.types";

const INITIAL_STATE = {
  activities: [],
  isFetching: false,
  activity: null,
  errorMessage: "",
  submitting: false,
  target: "",
};

const activityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActivityTypes.FETCH_ACTIVITIES_START:
      return {
        ...state,
        isFetching: true,
      };
    case ActivityTypes.FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        activities: action.payload,
      };
    case ActivityTypes.FETCH_ACTIVITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case ActivityTypes.FETCH_ACTIVITY_START:
      return {
        ...state,
        isFetching: true,
      };
    case ActivityTypes.FETCH_ACTIVITY_SUCCESS:
      console.log("Fetch activity success");
      return {
        ...state,
        isFetching: false,
        activity: action.payload,
      };
    case ActivityTypes.FETCH_ACTIVITY_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case ActivityTypes.CREATE_ACTIVITY_START:
      return {
        ...state,
        submitting: true,
      };
    case ActivityTypes.CREATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        submitting: false,
        activity: action.payload,
        activities: [...state.activities, { ...action.payload }],
      };
    case ActivityTypes.CREATE_ACTIVITY_FAILURE:
      return {
        ...state,
        submitting: false,
        errorMessage: action.payload,
      };
    case ActivityTypes.EDIT_ACTIVITY_START:
      return {
        ...state,
        submitting: true,
      };
    case ActivityTypes.EDIT_ACTIVITY_SUCCESS:
      const activity = { ...action.payload };
      return {
        ...state,
        submitting: false,
        activity: activity,
        activities: [
          ...state.activities.filter((a) => a.id !== activity.id),
          activity,
        ],
      };
    case ActivityTypes.EDIT_ACTIVITY_FAILURE:
      return {
        ...state,
        submitting: false,
        errorMessage: action.payload,
      };
    case ActivityTypes.DELETE_ACTIVITY_START:
      const { target } = action.payload;
      return {
        ...state,
        submitting: true,
        target: target,
        activity: null,
      };
    case ActivityTypes.DELETE_ACTIVITY_SUCCESS:
      const id = action.payload;
      return {
        ...state,
        submitting: false,
        activities: [...state.activities.filter((a) => a.id !== id)],
      };
    case ActivityTypes.DELETE_ACTIVITY_FAILURE:
      return {
        ...state,
        submitting: false,
        errorMessage: action.payload,
      };
    case ActivityTypes.SET_SELECTED_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
      };
    case ActivityTypes.CLEAR_ACTIVITY:
      if (state.activity !== null) {
        return {
          ...state,
          activity: null,
        };
      } else {
        return {
          ...state,
        };
      }
    case ActivityTypes.SET_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
};

export default activityReducer;
