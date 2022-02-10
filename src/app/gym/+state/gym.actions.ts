import { createAction, props } from "@ngrx/store";
import { GymUser } from "src/app/model/gym-user.model";
import { Gym } from "src/app/model/gym.model";
import { UserRole } from "src/app/model/user-role.type";
import { User } from "src/app/model/user.model";

export const getGym = createAction('[gym] GET_GYM', props<{ gymId: string }>());

export const getGymSuccess = createAction('[gym] GET_GYM_SUCCESS', props<{ gym: Gym }>());

export const getGymFailed = createAction('[gym] GET_GYM_FAILED', props<{ error: Error }>());

export const getGymUser = createAction('[gym] GET_GYM_USER');

export const getGymUserSuccess = createAction('[gym] GET_GYM_USER_SUCCESS', props<{ gymUser: User }>());

export const getGymUserFailed = createAction('[gym] GET_GYM_USER_FAILED', props<{ gymId: string }>());

export const loadGymUsers = createAction('[gym] LOAD_GYM_USERS', props<{ userRole: UserRole }>());

export const loadGymUsersSuccess = createAction('[gym] LOAD_GYM_USERS_SUCCESS', props<{users: Array<User>}>());

export const loadGymUsersFail = createAction('[gym] LOAD_GYM_USERS_FAIL', props<{error: Error}>()); 

export const inviteUsers = createAction('[gym] INVITE_USERS', props<{ role: UserRole }>());

export const inviteUsersSuccess = createAction('[gym] INVITE_USERS_SUCCESS');

export const inviteUsersFail = createAction('[gym] INVITE_USERS_FAIL', props<{ error: Error }>());