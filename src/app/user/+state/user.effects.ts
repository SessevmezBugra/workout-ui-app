import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, merge, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import { GymFacade } from "src/app/gym/+state/gym.facade";

import * as UserActions from "./user.actions";
import { UserFacade } from "./user.facade";
import { UserService } from "./user.service";

@Injectable()
export class UserEffects {

    constructor(
        
    ) { }

}