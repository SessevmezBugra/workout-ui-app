import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { StoreModule } from '@ngrx/store';
import { trainingFeatureKey, trainingInitialState, trainingReducer } from './+state/training.reducer';
import { TrainingEffects } from './+state/training.effects';
import { EffectsModule } from '@ngrx/effects';
import { TrainingService } from './+state/training.service';
import { TrainingFacade } from './+state/training.facade';
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
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { GymModule } from '../gym/gym.module';



@NgModule({
  declarations: [
    TrainingComponent,
    TrainingListComponent,
    TrainingDetailComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MatTableModule,
    StoreModule.forFeature(trainingFeatureKey, trainingReducer, {
      initialState: trainingInitialState,
    }),
    EffectsModule.forFeature([TrainingEffects]),
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
    UserModule,
    AuthModule,
    GymModule
  ],
  providers: [TrainingService, TrainingEffects, TrainingFacade],
})
export class TrainingModule { }
