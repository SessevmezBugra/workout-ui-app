import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, merge, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import { GymFacade } from "src/app/gym/+state/gym.facade";

import * as UserActions from "./user.actions";
import { UserFacade } from "./user.facade";
import { UserService } from "./user.service";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private gymFacade: GymFacade,
        private userFacade: UserFacade
    ) { }

    loadGymUsersByGymIdAndUserRole = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadGymUsers, UserActions.setGymUserRole),
            withLatestFrom(this.userFacade.gymUserRole$, this.gymFacade.gymId$),
            concatMap(([_, gymUserRole, gymId]) =>
                this.userService.getGymUsersByGymIdAndUserRole(gymId, gymUserRole).pipe(
                    map((response) => UserActions.loadGymUsersSuccess({ users: response })),
                    catchError((error) => of(UserActions.loadGymUsersFail(error))),
                ),
            ),
        ),
    );

    searchUsersBySearchText = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.searchUser),
            concatMap((action) =>
                this.userService.getUsersBySearchText(action.search).pipe(
                    map((response) => UserActions.searchUserSuccess({ users: response })),
                    catchError((error) => of(UserActions.searchUserFail(error))),
                ),
            ),
        ),
    );

    inviteUsers = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.inviteUsers),
            withLatestFrom(this.userFacade.gymUserRole$, this.gymFacade.gymId$),
            concatMap(([action, role, gymId]) =>
                this.userService.sendGymInvitationToUsers(gymId, role, action.userIds).pipe(
                    mergeMap((response) => [UserActions.inviteUsersSuccess(), UserActions.loadGymUsers()]),
                    catchError((error) => of(UserActions.inviteUsersFail(error))),
                ),
            ),
        ),
    );

}