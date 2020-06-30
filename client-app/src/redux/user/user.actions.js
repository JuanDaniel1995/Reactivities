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
export const updateUser = (user) => ({
  type: UserTypes.UPDATE_USER,
  payload: user,
});
export const logOut = () => ({
  type: UserTypes.LOGOUT,
});
export const setImage = (image) => ({
  type: UserTypes.SET_IMAGE,
  payload: image,
});
