import { Action, createReducer, on } from "@ngrx/store";
import { UserRole } from "src/app/model/user-role.type";
import { GymUser } from "src/app/model/gym-user.model";
import * as UserListActions from "./user-list.actions";
import { User } from "src/app/model/user.model";

export const userListFeatureKey = "userList";

export interface UserListState {
    gymUsers: Array<GymUser>;
    gymUserRole: UserRole;
    searchedUsers: Array<User>;
    selectedUserIds: Array<string>;
}

export interface UserRootState {
    readonly [userListFeatureKey]: UserListState;
}

export const userListInitialState: UserListState = {
    gymUsers: [],
    gymUserRole: 'ATHLETE',
    searchedUsers: [],
    selectedUserIds: []
}

const reducer = createReducer(
    userListInitialState,
    on(UserListActions.setGymUserRole, (state, action) => ({
        ...state,
        gymUserRole: action.role
    })),
    on(UserListActions.searchUserSuccess, (state, action) => ({
        ...state,
        searchedUsers: action.users
    })),
    on(UserListActions.updateSelectedUsers, (state, action) => ({
        ...state,
        selectedUserIds: action.userIds
    })),
);

export function userListReducer(state: UserListState | undefined, action: Action): UserListState {
    return reducer(state, action);
}