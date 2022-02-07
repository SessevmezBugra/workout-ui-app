import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { userQuery } from "./user.selectors";
import * as UserActions from "./user.actions";
import { UserRole } from "src/app/model/user-role.type";

@Injectable()
export class UserFacade {

    user$ = this.store.select(userQuery.getUserProfile);

    constructor(private store: Store<UserState>) { }

    getUser(userId: string) {
        this.store.dispatch(UserActions.loadUserProfile({userId}));
    }
}