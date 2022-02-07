import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  userFeatureKey, UserState } from "./user.reducer";

const getUser = createFeatureSelector<UserState>(userFeatureKey);
export const getUserProfile = createSelector(getUser, (state: UserState) => state.user);

export const userQuery = {
    getUserProfile
}