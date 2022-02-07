import { createAction, props } from "@ngrx/store";
import { UserRole } from "src/app/model/user-role.type";

export const setGymId = createAction('[gym-list] SET_GYM_ID', props<{ gymId: string | null }>());

export const setUserRole = createAction('[gym-detail] SET_USER_ROLE', props<{ userRole: UserRole }>());