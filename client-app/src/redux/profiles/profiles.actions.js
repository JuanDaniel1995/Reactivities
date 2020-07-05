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
export const updateProfile = (profile) => ({
  type: ProfilesTypes.UPDATE_PROFILE_START,
  payload: profile,
});
export const updateProfileSuccess = (profile) => ({
  type: ProfilesTypes.UPDATE_PROFILE_SUCCESS,
  payload: profile,
});
export const updateProfileFailure = () => ({
  type: ProfilesTypes.UPDATE_PROFILE_FAILURE,
});
export const followProfile = (username) => ({
  type: ProfilesTypes.FOLLOW_PROFILE_START,
  payload: username,
});
export const followProfileSuccess = (username) => ({
  type: ProfilesTypes.FOLLOW_PROFILE_SUCCESS,
  payload: username,
});
export const followProfileFailure = () => ({
  type: ProfilesTypes.FOLLOW_PROFILE_FAILURE,
});
export const unfollowProfile = (username) => ({
  type: ProfilesTypes.UNFOLLOW_PROFILE_START,
  payload: username,
});
export const unfollowProfileSuccess = (username) => ({
  type: ProfilesTypes.UNFOLLOW_PROFILE_SUCCESS,
  payload: username,
});
export const unfollowProfileFailure = () => ({
  type: ProfilesTypes.UNFOLLOW_PROFILE_FAILURE,
});
export const fetchFollowings = (username, predicate) => ({
  type: ProfilesTypes.RETRIEVE_FOLLOWINGS_START,
  payload: { username, predicate },
});
export const fetchFollowingsSuccess = (profiles) => ({
  type: ProfilesTypes.RETRIEVE_FOLLOWINGS_SUCCESS,
  payload: profiles,
});
export const fetchFollowingsFailure = () => ({
  type: ProfilesTypes.RETRIEVE_FOLLOWINGS_FAILURE,
});
