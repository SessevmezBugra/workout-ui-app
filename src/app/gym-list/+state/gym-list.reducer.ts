import { Action, createReducer, on } from "@ngrx/store";
import { Gym } from "src/app/model/gym.model";
import * as GymListActions from "./gym-list.actions";

export const gymListFeatureKey = "gymList";

export interface GymListState {
  gymList: Array<Gym>;
}

export interface GymListRootState {
  readonly [gymListFeatureKey]: GymListState;
}

export const gymListInitialState: GymListState = {
  gymList: [],
}

const reducer = createReducer(
  gymListInitialState,
  on(GymListActions.loadGymsByLoggedUserSuccess, (state, action) => ({
    ...state,
    gymList: action.gyms
  })),

);

export function gymListReducer(state: GymListState | undefined, action: Action): GymListState {
  return reducer(state, action);
}