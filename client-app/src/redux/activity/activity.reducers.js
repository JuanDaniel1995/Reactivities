import ActivityTypes from "./activity.types";

const INITIAL_STATE = {
  activities: [],
  isFetching: false,
  selectedActivity: null,
  errorMessage: "",
  editMode: false,
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
    case ActivityTypes.CREATE_ACTIVITY_START:
      return {
        ...state,
        submitting: true,
      };
    case ActivityTypes.CREATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        submitting: false,
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
        selectedActivity: null,
      };
    case ActivityTypes.DELETE_ACTIVITY_SUCCESS:
      const id = action.payload;
      console.log(id);
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
        selectedActivity: action.payload,
      };
    case ActivityTypes.SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      };
    case ActivityTypes.OPEN_CREATE_FORM:
      return {
        ...state,
        selectedActivity: null,
        editMode: true,
      };
    default:
      return state;
  }
};

export default activityReducer;
