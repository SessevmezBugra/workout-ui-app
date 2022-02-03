import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from "rxjs";
import { GymService } from "./gym.service";
import * as GymActions from "./gym.actions";
import { NgrxDialogFacade } from "src/app/ngrx-dialog/+state/ngrx-dialog.facade";
import { go } from "src/app/ngrx-router/+state/router.actions";
import { Router } from "@angular/router";

@Injectable()
export class GymEffects {

    constructor(
        private actions$: Actions,
        private gymService: GymService,
        private ngrxDialogFacade: NgrxDialogFacade,
        private router: Router
    ) { }

    loadGymsByLoggedUser = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.loadGymsByLoggedUser),
            concatMap(() =>
                this.gymService.getGymsByLoggedUser().pipe(
                    map((response) => GymActions.loadGymsByLoggedUserSuccess({ gyms: response })),
                    catchError((error) => of(GymActions.loadGymsByLoggedUserFail(error))),
                ),
            ),
        ),
    );

    createGym = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.createGym),
            withLatestFrom(this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, data]) => 
                this.gymService.createGym(data).pipe(
                    mergeMap((response) => [GymActions.loadGymsByLoggedUser(), GymActions.createGymSuccess()]),
                    catchError((error) => of(GymActions.createGymFail(error))),
                ),
            ),
        ),
    );

    updateGym = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.updateGym),
            withLatestFrom(this.ngrxDialogFacade.formDialogFormData$),
            concatMap(([_, data]) => 
                this.gymService.updateGym(data).pipe(
                    mergeMap((response) => [GymActions.loadGymsByLoggedUser(), GymActions.updateGymSuccess()]),
                    catchError((error) => of(GymActions.updateGymFail(error))),
                ),
            ),
        ),
    );

    setUserRole = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.setUserRole),
            map(_ => go({ to: { path: [this.router.url.substring(0, this.router.url.indexOf('user') == -1 ? this.router.url.length : this.router.url.indexOf('user')), 'user'] } })),
        ),
    );

}