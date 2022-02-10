import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { UserRole } from "src/app/model/user-role.type";
import { GymUser } from "src/app/model/gym-user.model";
import * as UserActions from "./user.actions";
import { User } from "src/app/model/user.model";

export const userFeatureKey = "user";

export interface UserState {
    user: User;
    // isEqualToLoggedUser: boolean
}

export interface UserRootState {
    readonly [userFeatureKey]: UserState;
}

export const userInitialState: UserState = {
    user: {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        role: 'ATHLETE',
        status: 'ACTIVE'
    },
    // isEqualToLoggedUser: false
}

const reducer = createReducer(
    userInitialState,
    on(UserActions.loadUserProfileSuccess, (state, action) => ({
        ...state,
        user: action.user
    })),
    // on(UserActions.updateIsEqualToLoggedUser, (state, action) => ({
    //     ...state,
    //     isEqualToLoggedUser: action.isEqual
    // }))
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
    return reducer(state, action);
}