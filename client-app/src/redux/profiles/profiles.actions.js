import ProfilesTypes from "./profiles.types";

export const fetchProfile = (user) => ({
  type: ProfilesTypes.RETRIEVE_PROFILE_START,
  payload: user,
});
export const fetchProfileSuccess = (profile) => ({
  type: ProfilesTypes.RETRIEVE_PROFILE_SUCCESS,
  payload: profile,
});
export const fetchProfileFailure = () => ({
  type: ProfilesTypes.RETRIEVE_PROFILE_FAILURE,
});
export const uploadPhoto = (file) => ({
  type: ProfilesTypes.UPLOAD_PHOTO_START,
  payload: file,
});
export const uploadPhotoSuccess = (image) => ({
  type: ProfilesTypes.UPLOAD_PHOTO_SUCCESS,
  payload: image,
});
export const uploadPhotoFailure = () => ({
  type: ProfilesTypes.UPLOAD_PHOTO_FAILURE,
});
export const setMainPhoto = (photo) => ({
  type: ProfilesTypes.SET_MAIN_PHOTO_START,
  payload: photo,
});
export const setMainPhotoSuccess = (photo) => ({
  type: ProfilesTypes.SET_MAIN_PHOTO_SUCCESS,
  payload: photo,
});
export const setMainPhotoFailure = () => ({
  type: ProfilesTypes.SET_MAIN_PHOTO_FAILURE,
});
export const deletePhoto = (photo) => ({
  type: ProfilesTypes.DELETE_PHOTO_START,
  payload: photo,
});
export const deletePhotoSuccess = (photo) => ({
  type: ProfilesTypes.DELETE_PHOTO_SUCCESS,
  payload: photo,
});
export const deletePhotoFailure = () => ({
  type: ProfilesTypes.DELETE_PHOTO_SUCCESS,
});
