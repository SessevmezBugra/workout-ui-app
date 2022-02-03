import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';
import {MatListModule} from '@angular/material/list';
import { userFeatureKey, userInitialState, userReducer } from './+state/user.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+state/user.effects';
import { UserService } from './+state/user.service';
import { UserFacade } from './+state/user.facade';
import { MatDialogModule } from '@angular/material/dialog';
import { UserInviteComponent } from './user-invite/user-invite.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GymModule } from '../gym/gym.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserComponent,
    UserInviteComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatListModule,
    StoreModule.forFeature(userFeatureKey, userReducer, {
      initialState: userInitialState,
    }),
    EffectsModule.forFeature([UserEffects]),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    GymModule
  ],
  providers: [UserService, UserEffects, UserFacade]
})
export class UserModule { }
