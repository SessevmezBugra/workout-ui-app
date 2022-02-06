import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { KeycloakService } from "keycloak-angular";
import { AuthState } from "./auth.reducer";
import * as AuthActions from "./auth.actions";
import { authQuery } from "./auth.selectors";

@Injectable()
export class AuthFacade {

    isLoggedIn$ = this.store.select(authQuery.getIsLogin);

    constructor(private store: Store<AuthState>) {}

    login() {
      this.store.dispatch(AuthActions.login());
    }

    updateToken() {
        this.store.dispatch(AuthActions.updateToken());
    }
}