import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export const authFeatureKey = "auth";

export interface AuthState {
    isLoggedIn: boolean;
}

export interface AuthRootState {
    readonly [authFeatureKey]: AuthState;
}

export const authInitialState: AuthState = {
    isLoggedIn: false
}

const reducer = createReducer(
    authInitialState,
    on(AuthActions.loginSuccess, (state, action) => ({
        ...state,
        isLoggedIn: true
    })),
    on(AuthActions.loginFailed, (state, action) => ({
        ...state,
        isLoggedIn: false
    })),
    on(AuthActions.updateTokenSuccess, (state, action) => ({
        ...state,
        isLoggedIn: true
    })),
    on(AuthActions.updateTokenFailed, (state, action) => ({
        ...state,
        isLoggedIn: false
    })),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return reducer(state, action);
}