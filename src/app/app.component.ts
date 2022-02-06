import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workout-ui';
  links = [{ label: "Antrenmanim", path: "training" }, { label: "Salonum", path: "gym" }];
  activeLink = this.links[0];

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService, private router: Router) { }

  public async ngOnInit() {
    // this.router.events
    // .pipe(
    //   filter(event => event instanceof NavigationEnd)
    // )
    // .subscribe(event => {
    //   for(var link of this.links) {
    //     if(event instanceof NavigationEnd && event.url.includes(link.path)){
    //       this.activeLink = link;
    //     }
    //   }
    // });

    // this.isLoggedIn = await this.keycloak.isLoggedIn();

    // if (this.isLoggedIn) {
    //   this.userProfile = await this.keycloak.loadUserProfile();
    // } else {
    //   this.login();
    // }

  }

  // public login() {
  //   this.keycloak.login();
  // }
}
