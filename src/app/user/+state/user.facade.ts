import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { userQuery } from "./user.selectors";
import * as UserActions from "./user.actions";
import { UserRole } from "src/app/model/user-role.type";

@Injectable()
export class UserFacade {

    gymUsers$ = this.store.select(userQuery.getGymUsers);
    gymUserRole$ = this.store.select(userQuery.getGymUserRole);
    searchedUsers$ = this.store.select(userQuery.getSearchedUsers);
    userId$ = this.store.select(userQuery.getUserId);

    constructor(private store: Store<UserState>) { }

    loadGymUsersByGymIdAndUserRole() {
        this.store.dispatch(UserActions.loadGymUsers());
    }

    setGymUserRole(role: UserRole) {
        this.store.dispatch(UserActions.setGymUserRole({role}));
    }

    searchUser(search: string) {
        this.store.dispatch(UserActions.searchUser({search}));
    }

    inviteUsers(userIds: Array<string>) {
        this.store.dispatch(UserActions.inviteUsers({userIds}))
    }

    setUserId(userId: string) {
        this.store.dispatch(UserActions.setUserId({userId}));
    }
}