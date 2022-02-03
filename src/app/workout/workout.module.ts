import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutComponent } from './workout.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { StoreModule } from '@ngrx/store';
import { workoutFeatureKey, workoutInitialState, workoutReducer } from './+state/workout.reducer';
import { WorkoutEffects } from './+state/workout.effects';
import { EffectsModule } from '@ngrx/effects';
import { WorkoutService } from './+state/workout.service';
import { WorkoutFacade } from './+state/workout.facade';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { NgrxDialogModule } from '../ngrx-dialog/ngrx-dialog.module';
import { UserFacade } from '../user/+state/user.facade';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    WorkoutComponent,
    WorkoutListComponent,
    WorkoutDetailComponent,
  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    MatTableModule,
    StoreModule.forFeature(workoutFeatureKey, workoutReducer, {
      initialState: workoutInitialState,
    }),
    EffectsModule.forFeature([WorkoutEffects]),
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
    NgrxDialogModule,
    UserModule
  ],
  providers: [WorkoutService, WorkoutEffects, WorkoutFacade],
})
export class WorkoutModule { }
