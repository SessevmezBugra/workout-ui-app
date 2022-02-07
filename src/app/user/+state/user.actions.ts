import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const loadUserProfile = createAction('[user-detail] LOAD_USER_PROFILE', props<{ userId: string }>());

export const loadUserProfileSuccess = createAction('[user-detail] LOAD_USER_PROFILE_SUCCESS', props<{ user: User }>());

export const loadUserProfileFailed = createAction('[user-detail] LOAD_USER_PROFILE_FAILED', props<{ error: Error }>());

export const updateIsEqualToLoggedUser = createAction('[user-detail] LOAD_USER_PROFILE', props<{ isEqual: boolean }>());