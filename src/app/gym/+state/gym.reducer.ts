import { Action, createReducer, on } from "@ngrx/store";
import { Gym } from "src/app/model/gym.model";
import { UserRole } from "src/app/model/user-role.type";
import * as GymActions from "./gym.actions";

export const gymFeatureKey = "gym";

export interface GymState {
    gymId: string | null;
    userRole: UserRole;
}

export interface GymRootState {
    readonly [gymFeatureKey]: GymState;
  }

  export const gymInitialState : GymState = {
    gymId: '' ,
    userRole: 'ATHLETE',
  }

  const reducer = createReducer(
    gymInitialState,
    on(GymActions.setGymId, (state, action) => ({
      ...state,
      gymId: action.gymId
    })),
    on(GymActions.setUserRole, (state, action) => ({
      ...state,
      userRole: action.userRole
    })),
    
  );
  
  export function gymReducer(state: GymState | undefined, action: Action): GymState {
    return reducer(state, action);
  }
  