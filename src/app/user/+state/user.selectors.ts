import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  userFeatureKey, UserState } from "./user.reducer";

const getUser = createFeatureSelector<UserState>(userFeatureKey);
export const getGymUsers = createSelector(getUser, (state: UserState) => state.gymUsers);
export const getGymUserRole = createSelector(getUser, (state: UserState) => state.gymUserRole);
export const getSearchedUsers = createSelector(getUser, (state: UserState) => state.searchedUsers);
export const getUserId = createSelector(getUser, (state: UserState) => state.userId);

export const userQuery = {
    getGymUsers,
    getGymUserRole,
    getSearchedUsers,
    getUserId
}