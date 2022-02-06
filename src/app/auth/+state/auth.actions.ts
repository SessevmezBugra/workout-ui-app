import { createAction, props } from "@ngrx/store";

export const login = createAction('[auth] LOGIN');

export const loginSuccess = createAction('[auth] LOGIN_SUCCESS');

export const loginFailed = createAction('[auth] LOGIN_FAILED', props<{error: Error}>());

export const updateToken = createAction('[auth] UPDATE_TOKEN');

export const updateTokenSuccess = createAction('[auth] UPDATE_TOKEN_SUCCESS');

export const updateTokenFailed = createAction('[auth] UPDATE_TOKEN_FAILED', props<{error: Error}>());