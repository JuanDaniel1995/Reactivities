import UserTypes from "./user.types";

const INITIAL_STATE = {
  user: null,
  token: window.localStorage.getItem("jwt"),
  submitting: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOGIN_SUCCESS:
      return {
        ...state,
        submitting: false,
        user: action.payload,
        token: action.payload.token,
      };
    case UserTypes.REGISTER_SUCCESS:
      return {
        ...state,
        submitting: false,
        user: action.payload,
        token: action.payload.token,
      };
    case UserTypes.RETRIEVE_USER_SUCCESS:
      return {
        ...state,
        submitting: false,
        user: action.payload,
        token: action.payload.token,
      };
    case UserTypes.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    case UserTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case UserTypes.SET_IMAGE:
      const image = action.payload;
      return {
        ...state,
        user: { ...state.user, image },
      };
    case UserTypes.UPDATE_USER:
      console.log(action.payload);
      return {
        ...state,
        user: { ...state.user, displayName: action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
