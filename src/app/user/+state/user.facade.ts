import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { userQuery } from "./user.selectors";
import * as UserActions from "./user.actions";
import { UserRole } from "src/app/model/user-role.type";

@Injectable()
export class UserFacade {

    userId$ = this.store.select(userQuery.getUserId);

    constructor(private store: Store<UserState>) { }

    setUserId(userId: string) {
        this.store.dispatch(UserActions.setUserId({userId}));
    }
}