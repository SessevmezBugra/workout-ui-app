import { createFeatureSelector, createSelector } from "@ngrx/store";
import { gymFeatureKey, GymState } from "./gym.reducer";

const getGymState = createFeatureSelector<GymState>(gymFeatureKey);
export const getGym = createSelector(getGymState, (state: GymState) => state.gym);
export const getGymUser = createSelector(getGymState, (state: GymState) => state.gymUser);
export const getGymUsers = createSelector(getGymState, (state: GymState) => state.gymUsers);

export const gymQuery = {
    getGym,
    getGymUser,
    getGymUsers
};
