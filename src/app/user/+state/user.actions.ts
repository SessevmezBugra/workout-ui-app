import { createAction, props } from "@ngrx/store";

export const setUserId = createAction('[user-detail] SET_USER_ID', props<{ userId: string }>());