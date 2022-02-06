import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListComponent } from './user-list/user-list.component';
import {MatListModule} from '@angular/material/list';
import { userListFeatureKey, userListInitialState, userListReducer } from './+state/user-list.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserListEffects } from './+state/user-list.effects';
import { UserListService } from './+state/user-list.service';
import { UserListFacade } from './+state/user-list.facade';
import { MatDialogModule } from '@angular/material/dialog';
import { UserInviteComponent } from './user-invite/user-invite.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GymModule } from '../gym/gym.module';
import { UserListRoutingModule } from './user-list-routing.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserInviteComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    CommonModule,
    MatListModule,
    StoreModule.forFeature(userListFeatureKey, userListReducer, {
      initialState: userListInitialState,
    }),
    EffectsModule.forFeature([UserListEffects]),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    GymModule
  ],
  providers: [UserListService, UserListEffects, UserListFacade]
})
export class UserListModule { }
