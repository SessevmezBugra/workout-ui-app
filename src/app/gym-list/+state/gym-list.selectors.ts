import { createFeatureSelector, createSelector } from "@ngrx/store";
import { gymListFeatureKey, GymListState } from "./gym-list.reducer";

const getGymList = createFeatureSelector<GymListState>(gymListFeatureKey);
export const getGymsByLoggedUser = createSelector(getGymList, (state: GymListState) => state.gymList);

export const gymListQuery = {
    getGymsByLoggedUser,
};
