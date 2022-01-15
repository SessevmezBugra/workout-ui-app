import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { TrainingListComponent } from './training-list/training-list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    TrainingComponent,
    TrainingDetailComponent,
    TrainingListComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MatGridListModule,
    MatListModule,
    MatIconModule
  ]
})
export class TrainingModule { }
