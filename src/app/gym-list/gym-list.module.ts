import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymListRoutingModule } from './gym-list-routing.module';
import { StoreModule } from '@ngrx/store';
import { gymListReducer, gymListFeatureKey, gymListInitialState } from './+state/gym-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GymListService } from './+state/gym-list.service';
import { GymListFacade } from './+state/gym-list.facade';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgrxDialogModule } from '../ngrx-dialog/ngrx-dialog.module';
import {MatButtonModule} from '@angular/material/button';
import { GymListComponent } from './gym-list/gym-list.component';
import { GymListEffects } from './+state/gym-list.effects';

@NgModule({
  declarations: [
    GymListComponent
  ],
  imports: [
    CommonModule,
    GymListRoutingModule,
    StoreModule.forFeature(gymListFeatureKey, gymListReducer, {
      initialState: gymListInitialState,
    }),
    EffectsModule.forFeature([GymListEffects]),
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    NgrxDialogModule
  ],
  providers: [GymListService, GymListEffects, GymListFacade],
})
export class GymListModule { }
