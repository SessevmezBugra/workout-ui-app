import { createAction, props } from "@ngrx/store";
import { Gym } from "src/app/model/gym.model";

export const loadGymsByLoggedUser = createAction('[gym-list] LOAD_GYMS_BY_LOGGED_USER');

export const loadGymsByLoggedUserSuccess = createAction('[gym-list] LOAD_GYMS_BY_LOGGED_USER_SUCCESS', props<{ gyms: Array<Gym> }>());

export const loadGymsByLoggedUserFail = createAction('[gym-list] LOAD_GYMS_BY_LOGGED_USER_FAIL', props<{ error: Error }>());

export const createGym = createAction('[gym-list] CREATE_GYM');

export const createGymSuccess = createAction('[gym-list] CREATE_GYM_SUCCESS');

export const createGymFail = createAction('[gym-list] CREATE_GYM_FAIL', props<{ error: Error }>());

export const updateGym = createAction('[gym-list] UPDATE_GYM');

export const updateGymSuccess = createAction('[gym-list] UPDATE_GYM_SUCCESS');

export const updateGymFail = createAction('[gym-list] UPDATE_GYM_FAIL', props<{ error: Error }>());
