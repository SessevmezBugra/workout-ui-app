import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { KeycloakService } from "keycloak-angular";
import { catchError, concatMap, map, merge, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private keycloakService: KeycloakService) { }

    login = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login, AuthActions.loginFailed, AuthActions.updateTokenFailed),
            concatMap((action) =>
                this.keycloakService.login()
                    .then(() => AuthActions.loginSuccess())
                    .catch((error) => AuthActions.loginFailed(error)),
            ),
        ),
    );

}