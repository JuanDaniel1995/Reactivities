import { createSelector } from "reselect";

const user = (state) => state.user;

export const selectUser = createSelector([user], (user) => user.user);

export const selectToken = createSelector([user], (user) => user.token);

export const isLoggedIn = createSelector([selectUser], (user) => !!user);
