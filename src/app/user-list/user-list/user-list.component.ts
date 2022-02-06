import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GymFacade } from 'src/app/gym/+state/gym.facade';
import { UserRole } from 'src/app/model/user-role.type';
import { GymUser } from 'src/app/model/gym-user.model';
import { UserListFacade } from '../+state/user-list.facade';
import { UserInviteComponent } from '../user-invite/user-invite.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  gymUsers$!: Observable<Array<GymUser>>;
  userRole!: UserRole;
  gymId!: string | null;

  constructor(private activatedRoute: ActivatedRoute, private userListFacade: UserListFacade, private gymFacade: GymFacade, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.gymUsers$ = this.userListFacade.gymUsers$;
    // this.activatedRoute.paramMap.subscribe((paramMap) => {
    //   let userRole = paramMap.get('userRole')
    //   if(userRole)
    //     this.userFacade.setGymUserRole(userRole as UserRole);
    // });

    this.gymFacade.userRole$.subscribe((role) => {
      this.userRole = role;
      this.userListFacade.setGymUserRole(role);
    });
  }

  openInviteUserDialog() {
    this.dialog.open(UserInviteComponent);
  }

  navigateToUserDetail(userId: string) {
    this.userListFacade.navigateToUserDetail(userId);
  }

}
