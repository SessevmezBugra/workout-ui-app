import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRole } from "src/app/model/user-role.type";
import { GymUser } from "src/app/model/gym-user.model";
import { ApiService } from "src/app/shared/api.service";
import { User } from "src/app/model/user.model";

@Injectable()
export class UserService {

    constructor(private apiService: ApiService) { }

    getUserByUserId(userId: string): Observable<User> {
        return this.apiService.get('/user/' + userId);
    }
}