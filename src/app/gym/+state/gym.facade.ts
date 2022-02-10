import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { GymState } from "./gym.reducer";
import { gymQuery } from "./gym.selectors";
import * as GymActions from "./gym.actions";
import { Gym } from "src/app/model/gym.model";
import { UserRole } from "src/app/model/user-role.type";

@Injectable()
export class GymFacade {

    gym$ = this.store.select(gymQuery.getGym);
    gymUser$ = this.store.select(gymQuery.getGymUser);
    gymUsers$ = this.store.select(gymQuery.getGymUsers);

    constructor(private store: Store<GymState>) { }

    getGym(gymId: string) {
        this.store.dispatch(GymActions.getGym({gymId}));
    }

    getGymUsers(userRole: UserRole) {
        this.store.dispatch(GymActions.loadGymUsers({userRole}));
    }

    inviteUsers(role: UserRole) {
        this.store.dispatch(GymActions.inviteUsers({role: role}));
    }
}