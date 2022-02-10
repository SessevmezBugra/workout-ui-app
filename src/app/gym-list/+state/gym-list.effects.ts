import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from "rxjs";
import { GymListService } from "./gym-list.service";
import * as GymListActions from "./gym-list.actions";
import { NgrxDialogFacade } from "src/app/ngrx-dialog/+state/ngrx-dialog.facade";
import { Router } from "@angular/router";

@Injectable()
export class GymListEffects {

    constructor(
        private actions$: Actions,
        private gymListService: GymListService,
        private ngrxDialogFacade: NgrxDialogFacade,
        private router: Router
    ) { }

    loadGymsByLoggedUser = createEffect(() =>
        this.actions$.pipe(
            ofType(GymListActions.loadGymsByLoggedUser, GymListActions.acceptInvitationSuccess, GymListActions.createGymSuccess, GymListActions.updateGymSuccess),
            concatMap(() =>
                this.gymListService.getGymsByLoggedUser().pipe(
                    map((response) => GymListActions.loadGymsByLoggedUserSuccess({ gyms: response })),
                    catchError((error) => of(GymListActions.loadGymsByLoggedUserFail(error))),
                ),
            ),
        ),
    );

    createGym = createEffect(() =>
        this.actions$.pipe(
            ofType(GymListActions.createGym),
            withLatestFrom(this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, data]) => 
                this.gymListService.createGym(data).pipe(
                    map((response) => GymListActions.createGymSuccess()),
                    catchError((error) => of(GymListActions.createGymFail(error))),
                ),
            ),
        ),
    );

    updateGym = createEffect(() =>
        this.actions$.pipe(
            ofType(GymListActions.updateGym),
            withLatestFrom(this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, data]) => 
                this.gymListService.updateGym(data).pipe(
                    map((response) => GymListActions.updateGymSuccess()),
                    catchError((error) => of(GymListActions.updateGymFail(error))),
                ),
            ),
        ),
    );

    acceptInvitation = createEffect(() =>
        this.actions$.pipe(
            ofType(GymListActions.acceptInvitation),
            concatMap((action) => 
                this.gymListService.acceptInvitation(action.gymId).pipe(
                    map((response) => GymListActions.acceptInvitationSuccess()),
                    catchError((error) => of(GymListActions.acceptInvitationFail(error))),
                ),
            ),
        ),
    );


}