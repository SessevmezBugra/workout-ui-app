import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from "rxjs";
import { GymService } from "./gym.service";
import * as GymActions from "./gym.actions";
import { GymFacade } from "./gym.facade";
import { AuthFacade } from "src/app/auth/+state/auth.facade";
import { UserListFacade } from "src/app/user-list/+state/user-list.facade";

@Injectable()
export class GymEffects {

    constructor(
        private actions$: Actions,
        private gymService: GymService,
        private gymFacade: GymFacade,
        private authFacade: AuthFacade,
        private userListFacade: UserListFacade
    ) { }

    getGym = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.getGym),
            concatMap((action) =>
                this.gymService.getGymByGymId(action.gymId).pipe(
                    map((response) => GymActions.getGymSuccess({ gym: response })),
                    catchError((error) => of(GymActions.getGymFailed(error))),
                ),
            ),
        ),
    );

    getGymUser = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.getGymUser, GymActions.getGymSuccess),
            withLatestFrom(this.gymFacade.gym$, this.authFacade.userProfile$),
            concatMap(([_, gym, userProfile]) =>
                this.gymService.getGymUserByGymIdAndUserId(gym.id, userProfile.id!).pipe(
                    map((response) => GymActions.getGymUserSuccess({ gymUser: response })),
                    catchError((error) => of(GymActions.getGymUserFailed(error))),
                ),
            ),
        ),
    );

    getGymUsers = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.loadGymUsers),
            withLatestFrom(this.gymFacade.gym$),
            concatMap(([{userRole}, gym]) =>
                this.gymService.getGymUsersByGymIdAndUserRole(gym.id, userRole).pipe(
                    map((response) => GymActions.loadGymUsersSuccess({ users: response })),
                    catchError((error) => of(GymActions.loadGymUsersFail(error))),
                ),
            ),
        ),
    );

    inviteUsers = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.inviteUsers),
            withLatestFrom(this.gymFacade.gym$, this.userListFacade.selectedUserIds$),
            concatMap(([action, gym, userIds]) =>
                this.gymService.sendGymInvitationToUsers(gym.id, action.role, userIds).pipe(
                    mergeMap((response) => [GymActions.inviteUsersSuccess(), GymActions.loadGymUsers({userRole: action.role})]),
                    catchError((error) => of(GymActions.inviteUsersFail(error))),
                ),
            ),
        ),
    );

}