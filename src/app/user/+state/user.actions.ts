import { createAction, props } from "@ngrx/store";
import { UserRole } from "src/app/model/user-role.type";
import { GymUser } from "src/app/model/gym-user.model";
import { User } from "src/app/model/user.model";

export const loadGymUsers = createAction('[user-list] LOAD_GYM_USERS');

export const loadGymUsersSuccess = createAction('[user-list] LOAD_GYM_USERS_SUCCESS', props<{users: Array<GymUser>}>());

export const loadGymUsersFail = createAction('[user-list] LOAD_GYM_USERS_FAIL', props<{error: Error}>());

export const setGymUserRole = createAction('[user-list] SET_GYM_USER_ROLE', props<{ role: UserRole }>());

export const searchUser = createAction('[user-invite] SEARCH_USER', props<{ search: string }>());

export const searchUserSuccess = createAction('[user-invite] SEARCH_USER_SUCCESS', props<{users: Array<User>}>());

export const searchUserFail = createAction('[user-invite] SEARCH_USER_FAIL', props<{error: Error}>());

export const inviteUsers = createAction('[user-invite] INVITE_USERS', props<{ userIds: Array<string> }>());

export const inviteUsersSuccess = createAction('[user-invite] INVITE_USERS_SUCCESS');

export const inviteUsersFail = createAction('[user-invite] INVITE_USERS_FAIL', props<{ error: Error }>());

export const setUserId = createAction('[user-detail] SET_USER_ID', props<{ userId: string }>());