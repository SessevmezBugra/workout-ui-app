import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, merge, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import { GymFacade } from "src/app/gym/+state/gym.facade";

import * as UserListActions from "./user-list.actions";
import { UserListFacade } from "./user-list.facade";
import { UserListService } from "./user-list.service";

@Injectable()
export class UserListEffects {

    constructor(
        private actions$: Actions,
        private userListService: UserListService,
        private gymFacade: GymFacade,
        private userListFacade: UserListFacade
    ) { }

    loadGymUsersByGymIdAndUserRole = createEffect(() =>
        this.actions$.pipe(
            ofType(UserListActions.loadGymUsers, UserListActions.setGymUserRole),
            withLatestFrom(this.userListFacade.gymUserRole$, this.gymFacade.gymId$),
            concatMap(([_, gymUserRole, gymId]) =>
                this.userListService.getGymUsersByGymIdAndUserRole(gymId, gymUserRole).pipe(
                    map((response) => UserListActions.loadGymUsersSuccess({ users: response })),
                    catchError((error) => of(UserListActions.loadGymUsersFail(error))),
                ),
            ),
        ),
    );

    searchUsersBySearchText = createEffect(() =>
        this.actions$.pipe(
            ofType(UserListActions.searchUser),
            concatMap((action) =>
                this.userListService.getUsersBySearchText(action.search).pipe(
                    map((response) => UserListActions.searchUserSuccess({ users: response })),
                    catchError((error) => of(UserListActions.searchUserFail(error))),
                ),
            ),
        ),
    );

    inviteUsers = createEffect(() =>
        this.actions$.pipe(
            ofType(UserListActions.inviteUsers),
            withLatestFrom(this.userListFacade.gymUserRole$, this.gymFacade.gymId$),
            concatMap(([action, role, gymId]) =>
                this.userListService.sendGymInvitationToUsers(gymId, role, action.userIds).pipe(
                    mergeMap((response) => [UserListActions.inviteUsersSuccess(), UserListActions.loadGymUsers()]),
                    catchError((error) => of(UserListActions.inviteUsersFail(error))),
                ),
            ),
        ),
    );

}