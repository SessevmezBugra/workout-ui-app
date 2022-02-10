import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { UserRole } from 'src/app/model/user-role.type';
import { User } from 'src/app/model/user.model';
import { GymFacade } from '../+state/gym.facade';

@Component({
  selector: 'app-gym-user-list',
  templateUrl: './gym-user-list.component.html',
  styleUrls: ['./gym-user-list.component.scss']
})
export class GymUserListComponent implements OnInit {

  gymUsers$!: Observable<Array<User>>;
  userRole!: UserRole;
  canInvite: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private gymFacade: GymFacade) { }

  ngOnInit(): void {
    this.gymUsers$ = this.gymFacade.gymUsers$;

    this.activatedRoute.paramMap
      .pipe(
        $paramMap => combineLatest([$paramMap, this.gymFacade.gymUser$])
      )
      .subscribe(([paramMap, gymUser]) => {
        var userRole = paramMap.get("userRole");
        if (userRole) {
          this.userRole = userRole as UserRole;
          this.gymFacade.getGymUsers(this.userRole);
          if (gymUser.role == 'CO_FOUNDER') {
            this.canInvite = true;
          } else if (gymUser.role == 'TRAINER') {
            if (this.userRole == 'ATHLETE') {
              this.canInvite = true;
            }
          }
        }
      });

    // this.gymFacade.gymUser$.subscribe((gymUser) => {

    // });
  }

  inviteUsers() {
    this.gymFacade.inviteUsers(this.userRole);
  }

}
