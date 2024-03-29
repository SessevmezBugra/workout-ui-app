import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { login } from 'src/app/auth/+state/auth.actions';
import { go } from 'src/app/ngrx-router/+state/router.actions';
import * as NgrxErrorActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorEffects {
  error401$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => login()),
    ),
  );

  error404$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw404Error),
      map(_ => go({ to: { path: ['/'] } })),
    ),
  );

  constructor(private actions$: Actions) {}
}
