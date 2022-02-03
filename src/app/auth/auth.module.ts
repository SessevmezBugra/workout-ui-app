import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: `${environment.keycloak_url}/auth`,
        realm: 'workout',
        clientId: 'ui-app'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

function updateToken(keycloak: KeycloakService) {
   return () => keycloak.keycloakEvents$.subscribe({
    next: (e) => {
      console.log("keycloak event: " + e.type);
      if (e.type == KeycloakEventType.OnTokenExpired) {
        keycloak.updateToken(20);
      }
    }
  });
}



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
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
      deps: [KeycloakService]
    }
  ],
})
export class AuthModule { }
