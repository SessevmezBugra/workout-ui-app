import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { UserRole } from "src/app/model/user-role.type";
import { GymUser } from "src/app/model/gym-user.model";
import * as UserActions from "./user.actions";
import { User } from "src/app/model/user.model";

export const userFeatureKey = "user";

export interface UserState {
    gymUsers: Array<GymUser>;
    gymUserRole: UserRole;
    searchedUsers: Array<User>;
    userId: string;
}

export interface UserRootState {
    readonly [userFeatureKey]: UserState;
}

export const userInitialState: UserState = {
    gymUsers: [],
    gymUserRole: 'ATHLETE',
    searchedUsers: [],
    userId: ''
}

const reducer = createReducer(
    userInitialState,
    on(UserActions.loadGymUsersSuccess, (state, action) => ({
        ...state,
        gymUsers: action.users
    })),
    on(UserActions.setGymUserRole, (state, action) => ({
        ...state,
        gymUserRole: action.role
    })),
    on(UserActions.searchUserSuccess, (state, action) => ({
        ...state,
        searchedUsers: action.users
    })),
    on(UserActions.setUserId, (state, action) => ({
        ...state,
        userId: action.userId
    }))
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
    return reducer(state, action);
}