import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/shared/api.service";
import { Gym } from "src/app/model/gym.model";

@Injectable()
export class GymListService {

    constructor(private apiService: ApiService) { }

    getGymsByLoggedUser(): Observable<Array<Gym>> {
        return this.apiService.get('/gym');
    }

    createGym(gym: Gym): Observable<Gym> {
        return this.apiService.post('/gym', gym);
    }

    updateGym(gym: Gym): Observable<Gym> {
        return this.apiService.put('/gym', gym);
    }
}