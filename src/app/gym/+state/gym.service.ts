import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/shared/api.service";
import { Gym } from "src/app/model/gym.model";
import { GymUser } from "src/app/model/gym-user.model";
import { User } from "src/app/model/user.model";
import { UserRole } from "src/app/model/user-role.type";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class GymService {

    constructor(private apiService: ApiService) { }

    getGymByGymId(id: string): Observable<Gym> {
        return this.apiService.get('/gym/' + id);
    }

    getGymUserByGymIdAndUserId(gymId: string, userId: string): Observable<User> {
        return this.apiService.get('/gym/' + gymId + '/user/' + userId);
    }

    getGymUsersByGymIdAndUserRole(gymId: string, userRole: UserRole): Observable<Array<User>> {
        var params = new HttpParams();
        if (userRole)
            params = params.append("userRole", userRole);
        return this.apiService.get('/gym/' + gymId + '/user', params);
    }

    sendGymInvitationToUsers(gymId: string | null, userRole: UserRole, userIds: Array<string>): Observable<void> {
        var params = new HttpParams();
        params = params.append("userRole", userRole).append("userIds", userIds.join(", "));
        return this.apiService.get('/gym/' + gymId + '/invite', params);
    }
}