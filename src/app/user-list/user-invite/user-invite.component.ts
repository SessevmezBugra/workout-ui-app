import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserListFacade } from '../+state/user-list.facade';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.scss']
})
export class UserInviteComponent implements OnInit {

  searchedUsers$!: Observable<Array<User>>;
  formControl = new FormControl('', [Validators.required]);
  unsubscribe$: Subject<void> = new Subject();

  constructor(private userListFacade: UserListFacade) { }

  ngOnInit(): void {
    this.searchedUsers$ = this.userListFacade.searchedUsers$;
    this.formControl.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.unsubscribe$),
      )
      // .subscribe((changes: any) => console.log(changes));
      .subscribe((changes: any) => this.userListFacade.searchUser(changes));
  }

  onUserSelected(event: MatSelectionListChange) {
    let userIds = event.source.selectedOptions.selected.flatMap(option => option.value);
    this.userListFacade.updateSelectedUserIds(userIds);
  }

  getErrorMessage() {
    if (this.formControl.hasError('required')) {
      return 'Lutfen bu alani bos birakmayiniz';
    }
    return '';
  }

  ngOnDestroy() {
    console.log("user-invite-destroyed");
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
