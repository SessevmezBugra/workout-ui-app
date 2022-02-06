import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserListState } from "./user-list.reducer";
import { userListQuery } from "./user-list.selectors";
import * as UserListActions from "./user-list.actions";
import { UserRole } from "src/app/model/user-role.type";
import { go } from "src/app/ngrx-router/+state/router.actions";

@Injectable()
export class UserListFacade {

    gymUsers$ = this.store.select(userListQuery.getGymUsers);
    gymUserRole$ = this.store.select(userListQuery.getGymUserRole);
    searchedUsers$ = this.store.select(userListQuery.getSearchedUsers);

    constructor(private store: Store<UserListState>) { }

    loadGymUsersByGymIdAndUserRole() {
        this.store.dispatch(UserListActions.loadGymUsers());
    }

    setGymUserRole(role: UserRole) {
        this.store.dispatch(UserListActions.setGymUserRole({role}));
    }

    searchUser(search: string) {
        this.store.dispatch(UserListActions.searchUser({search}));
    }

    inviteUsers(userIds: Array<string>) {
        this.store.dispatch(UserListActions.inviteUsers({userIds}));
    }

    navigateToUserDetail(userId: string) {
        this.store.dispatch(go({ to: { path: ['/user', userId] } }));
    }
}