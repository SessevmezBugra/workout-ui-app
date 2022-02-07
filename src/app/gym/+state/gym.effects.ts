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
        private router: Router
    ) { }

    setUserRole = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.setUserRole),
            map(_ => go({ to: { path: [this.router.url.substring(0, this.router.url.indexOf('user') == -1 ? this.router.url.length : this.router.url.indexOf('user')), 'user'] } })),
        ),
    );

}