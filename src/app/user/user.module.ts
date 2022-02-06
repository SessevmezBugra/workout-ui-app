import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { userFeatureKey, userInitialState, userReducer } from './+state/user.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+state/user.effects';
import { UserService } from './+state/user.service';
import { UserFacade } from './+state/user.facade';
import { UserRoutingModule } from './user-routing.module';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgrxDialogModule } from '../ngrx-dialog/ngrx-dialog.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeatureKey, userReducer, {
      initialState: userInitialState,
    }),
    EffectsModule.forFeature([UserEffects]),
    MatListModule,
    MatSidenavModule,
    NgrxDialogModule,
    MatButtonModule
  ],
  providers: [UserService, UserEffects, UserFacade]
})
export class UserModule { }
