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

    

    getUsersBySearchText(searchText: string): Observable<Array<User>> {
        var params = new HttpParams();
        if (searchText)
            params = params.append("search", searchText);
        return this.apiService.get('/user', params);
    }

}