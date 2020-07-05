import { createSelector } from "reselect";

const profiles = (state) => state.profiles;

export const selectProfile = createSelector(
  [profiles],
  (profiles) => profiles.profile
);

export const selectIsProfileFetching = createSelector(
  [profiles],
  (profiles) => profiles.isFetching
);

export const selectIsProfileLoading = createSelector(
  [profiles],
  (profiles) => profiles.loading
);

export const selectIsPhotoUploading = createSelector(
  [profiles],
  (profiles) => profiles.uploading
);
export const selectFollowings = createSelector(
  [profiles],
  (profiles) => profiles.followings
);
