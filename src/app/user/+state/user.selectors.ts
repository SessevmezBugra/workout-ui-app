import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  userFeatureKey, UserState } from "./user.reducer";

const getUser = createFeatureSelector<UserState>(userFeatureKey);
export const getUserId = createSelector(getUser, (state: UserState) => state.userId);

export const userQuery = {
    getUserId
}