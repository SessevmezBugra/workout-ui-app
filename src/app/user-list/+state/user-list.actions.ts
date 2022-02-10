import { createAction, props } from "@ngrx/store";
import { UserRole } from "src/app/model/user-role.type";
import { GymUser } from "src/app/model/gym-user.model";
import { User } from "src/app/model/user.model";



export const setGymUserRole = createAction('[user-list] SET_GYM_USER_ROLE', props<{ role: UserRole }>());

export const searchUser = createAction('[user-invite] SEARCH_USER', props<{ search: string }>());

export const searchUserSuccess = createAction('[user-invite] SEARCH_USER_SUCCESS', props<{users: Array<User>}>());

export const searchUserFail = createAction('[user-invite] SEARCH_USER_FAIL', props<{error: Error}>());

export const updateSelectedUsers = createAction('[user-invite] UPDATE_SELECTED_USERS', props<{ userIds: Array<string> }>());
