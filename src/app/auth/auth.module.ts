import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import { AuthEffects } from './+state/auth.effects';
import { authFeatureKey, authInitialState, authReducer } from './+state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AuthFacade } from './+state/auth.facade';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: `${environment.keycloak_url}/auth`,
        realm: 'training',
        clientId: 'ui-app'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

function updateToken(keycloak: KeycloakService, authFacade: AuthFacade) {
  return () => keycloak.keycloakEvents$.subscribe({
    next: (e) => {
      console.log("keycloak event: " + e.type);
      if (e.type == KeycloakEventType.OnTokenExpired) {
        authFacade.updateToken();
      }
    }
  });
}



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, authReducer, {
      initialState: authInitialState,
    }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthFacade,
    AuthEffects,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: updateToken,
      multi: true,
      deps: [KeycloakService, AuthFacade]
    }
  ],
})
export class AuthModule { }
