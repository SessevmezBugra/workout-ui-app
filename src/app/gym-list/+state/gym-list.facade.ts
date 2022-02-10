import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { GymListState } from "./gym-list.reducer";
import { gymListQuery } from "./gym-list.selectors";
import * as GymListActions from "./gym-list.actions";

@Injectable()
export class GymListFacade {

    gyms$ = this.store.select(gymListQuery.getGymsByLoggedUser);

    constructor(private store: Store<GymListState>) { }
    
    loadGymsByLoggedUser() {
        this.store.dispatch(GymListActions.loadGymsByLoggedUser());
    }

    createGym() {
        this.store.dispatch(GymListActions.createGym());
    }

    updateGym() {
        this.store.dispatch(GymListActions.updateGym());
    }

    acceptInvitation(gymId: string) {
        this.store.dispatch(GymListActions.acceptInvitation({gymId}));
    } 
}