import { createFeatureSelector, createSelector } from "@ngrx/store";
import { gymFeatureKey, GymState } from "./gym.reducer";

const getGym = createFeatureSelector<GymState>(gymFeatureKey);
export const getGymId = createSelector(getGym, (state: GymState) => state.gymId);
export const getUserRole = createSelector(getGym, (state: GymState) => state.userRole);

export const gymQuery = {
    getGymId,
    getUserRole
};
