import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { GymUser } from 'src/app/model/gym-user.model';
import { User } from 'src/app/model/user.model';
import { UserFacade } from '../+state/user.facade';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.scss']
})
export class UserInviteComponent implements OnInit {

  searchedUsers$!: Observable<Array<User>>;
  formControl = new FormControl('', [Validators.required]);
  unsubscribe$: Subject<void> = new Subject();

  constructor(private userFacade: UserFacade) { }

  ngOnInit(): void {
    this.searchedUsers$ = this.userFacade.searchedUsers$;
    this.formControl.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.unsubscribe$),
      )
      // .subscribe((changes: any) => console.log(changes));
      .subscribe((changes: any) => this.userFacade.searchUser(changes));
  }

  getErrorMessage() {
    if (this.formControl.hasError('required')) {
      return 'Lutfen bu alani bos birakmayiniz';
    }
    return '';
  }

  sendInvitation(userOptions: MatListOption[]) {
    let userIds = userOptions.flatMap(option => option.value);
    this.userFacade.inviteUsers(userIds)

  }

  ngOnDestroy() {
    console.log("user-invite-destroyed");
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
