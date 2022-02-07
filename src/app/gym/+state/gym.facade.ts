import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { GymState } from "./gym.reducer";
import { gymQuery } from "./gym.selectors";
import * as GymActions from "./gym.actions";
import { Gym } from "src/app/model/gym.model";
import { UserRole } from "src/app/model/user-role.type";

@Injectable()
export class GymFacade {

    gymId$ = this.store.select(gymQuery.getGymId);
    userRole$ = this.store.select(gymQuery.getUserRole);

    constructor(private store: Store<GymState>) { }

    setGymId(gymId: string | null) {
        this.store.dispatch(GymActions.setGymId({gymId}));
    }

    setUserRole(userRole: UserRole) {
        this.store.dispatch(GymActions.setUserRole({userRole}));
    }
}