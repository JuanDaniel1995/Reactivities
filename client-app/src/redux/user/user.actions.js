import UserTypes from "./user.types";

export const loginSuccess = (user) => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: user,
});
export const registerSuccess = (user) => ({
  type: UserTypes.REGISTER_SUCCESS,
  payload: user,
});
export const retrieveUser = () => ({
  type: UserTypes.RETRIEVE_USER_START,
});
export const retrieveUserSuccess = (user) => ({
  type: UserTypes.RETRIEVE_USER_SUCCESS,
  payload: user,
});
export const logOut = () => ({
  type: UserTypes.LOGOUT,
});
