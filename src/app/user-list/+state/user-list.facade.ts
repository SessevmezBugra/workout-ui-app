import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserListState } from "./user-list.reducer";
import { userListQuery } from "./user-list.selectors";
import * as UserListActions from "./user-list.actions";
import { UserRole } from "src/app/model/user-role.type";
import { go } from "src/app/ngrx-router/+state/router.actions";

@Injectable()
export class UserListFacade {

    gymUserRole$ = this.store.select(userListQuery.getGymUserRole);
    searchedUsers$ = this.store.select(userListQuery.getSearchedUsers);
    selectedUserIds$ = this.store.select(userListQuery.getSelectedUserIds);

    constructor(private store: Store<UserListState>) { }

    setGymUserRole(role: UserRole) {
        this.store.dispatch(UserListActions.setGymUserRole({role}));
    }

    searchUser(search: string) {
        this.store.dispatch(UserListActions.searchUser({search}));
    }

    navigateToUserDetail(userId: string) {
        this.store.dispatch(go({ to: { path: ['/user', userId] } }));
    }

    updateSelectedUserIds(userIds: Array<string>) {
        this.store.dispatch(UserListActions.updateSelectedUsers({userIds: userIds}));
    }
    
}