import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { KeycloakService } from "keycloak-angular";
import { AuthState } from "./auth.reducer";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthFacade {

    constructor(private keycloakService: KeycloakService, private store: Store<AuthState>) {}

    login() {

    }

    updateToken() {
        this.keycloakService.updateToken(20)
          .then((isOk) => {
            if (isOk) {
              this.store.dispatch(AuthActions.updateTokenSuccess());
            } else {
              let error = new Error("Update token failed");
              this.store.dispatch(AuthActions.updateTokenFailed({ error }));
            }
          })
          .catch((error) => this.store.dispatch(AuthActions.updateTokenFailed({ error })));
    }
}