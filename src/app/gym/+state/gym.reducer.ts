import { Action, createReducer, on } from "@ngrx/store";
import { GymStatus } from "src/app/model/gym-status.enum";
import { GymUser } from "src/app/model/gym-user.model";
import { Gym } from "src/app/model/gym.model";
import { UserRole } from "src/app/model/user-role.type";
import { User } from "src/app/model/user.model";
import * as GymActions from "./gym.actions";

export const gymFeatureKey = "gym";

export interface GymState {
    gym: Gym;
    gymUser: User;
    gymUsers: Array<User>;
}

export interface GymRootState {
    readonly [gymFeatureKey]: GymState;
  }

  export const gymInitialState : GymState = {
    gym: {
      id: '',
      name: '',
      status: 'ACTIVE',
      userRole: 'ATHLETE',
      userStatus: 'DELETED'
    },
    gymUser: {
      id: '',
      username: '',
      role: 'ATHLETE',
      firstName: '',
      lastName: '',
      status: 'ACTIVE'
    },
    gymUsers: []
  }

  const reducer = createReducer(
    gymInitialState,
    on(GymActions.getGymSuccess, (state, action) => ({
      ...state,
      gym: action.gym
    })),
    on(GymActions.getGymUserSuccess, (state, action) => ({
      ...state,
      gymUser: action.gymUser
    })),
    on(GymActions.loadGymUsersSuccess, (state, action) => ({
      ...state,
      gymUsers: action.users
    })),
  );
  
  export function gymReducer(state: GymState | undefined, action: Action): GymState {
    return reducer(state, action);
  }
  