import { createSelector } from "reselect";

const common = (state) => state.common;

export const selectIsAppLoaded = createSelector(
  [common],
  (common) => common.appLoaded
);
