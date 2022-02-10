import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, merge, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import { AuthFacade } from "src/app/auth/+state/auth.facade";
import { GymFacade } from "src/app/gym/+state/gym.facade";

import * as UserActions from "./user.actions";
import { UserFacade } from "./user.facade";
import { UserService } from "./user.service";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private authFacade: AuthFacade
    ) { }

    loadUserProfile = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUserProfile),
            concatMap((action) =>
                this.userService.getUserByUserId(action.userId).pipe(
                    map((response) => UserActions.loadUserProfileSuccess({ user: response })),
                    catchError((error) => of(UserActions.loadUserProfileFailed(error))),
                ),
            ),
        ),
    );

    // updateIsEqualToLoggedUser = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(UserActions.loadUserProfileSuccess),
    //         withLatestFrom(this.authFacade.userProfile$),
    //         map(([{user}, authUserProfile]) =>
    //             UserActions.updateIsEqualToLoggedUser({ isEqual: user.id == authUserProfile.id}),
    //         ),
    //     ),
    // );

}