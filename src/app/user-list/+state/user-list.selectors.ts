import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  userListFeatureKey, UserListState } from "./user-list.reducer";

const getUser = createFeatureSelector<UserListState>(userListFeatureKey);
export const getGymUsers = createSelector(getUser, (state: UserListState) => state.gymUsers);
export const getGymUserRole = createSelector(getUser, (state: UserListState) => state.gymUserRole);
export const getSearchedUsers = createSelector(getUser, (state: UserListState) => state.searchedUsers);
export const getSelectedUserIds = createSelector(getUser, (state: UserListState) => state.selectedUserIds);

export const userListQuery = {
    getGymUsers,
    getGymUserRole,
    getSearchedUsers,
    getSelectedUserIds
}