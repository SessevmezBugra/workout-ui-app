import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRole } from "src/app/model/user-role.type";
import { GymUser } from "src/app/model/gym-user.model";
import { ApiService } from "src/app/shared/api.service";
import { User } from "src/app/model/user.model";

@Injectable()
export class UserListService {

    constructor(private apiService: ApiService) { }

    getGymUsersByGymIdAndUserRole(gymId: string | null | undefined, userRole: UserRole): Observable<Array<GymUser>> {
        var params = new HttpParams();
        if (gymId)
            params = params.append("gymId", gymId);
        if (userRole)
            params = params.append("userRole", userRole);
        return this.apiService.get('/gym-user', params);
    }

    getUsersBySearchText(searchText: string): Observable<Array<User>> {
        var params = new HttpParams();
        if (searchText)
            params = params.append("search", searchText);
        return this.apiService.get('/user', params);
    }

    sendGymInvitationToUsers(gymId: string | null, userRole: UserRole, userIds: Array<string>): Observable<void> {
        var params = new HttpParams();
        if (gymId) {
            params = params.append("gymId", gymId);
        }
        params = params.append("userRole", userRole).append("userIds", userIds.join(", "));
        return this.apiService.get('/gym-user/invite', params);
    }
}