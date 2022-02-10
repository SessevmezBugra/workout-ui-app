import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymRoutingModule } from './gym-routing.module';
import { GymDetailComponent } from './gym-detail/gym-detail.component';
import { StoreModule } from '@ngrx/store';
import { gymReducer, gymFeatureKey, gymInitialState } from './+state/gym.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GymEffects } from './+state/gym.effects';
import { GymService } from './+state/gym.service';
import { GymFacade } from './+state/gym.facade';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgrxDialogModule } from '../ngrx-dialog/ngrx-dialog.module';
import {MatButtonModule} from '@angular/material/button';
import { GymUserListComponent } from './gym-user-list/gym-user-list.component';
import { UserListModule } from '../user-list/user-list.module';

@NgModule({
  declarations: [
    GymDetailComponent,
    GymUserListComponent
  ],
  imports: [
    CommonModule,
    GymRoutingModule,
    StoreModule.forFeature(gymFeatureKey, gymReducer, {
      initialState: gymInitialState,
    }),
    EffectsModule.forFeature([GymEffects]),
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    NgrxDialogModule,
    UserListModule
  ],
  providers: [GymService, GymEffects, GymFacade],
})
export class GymModule { }
