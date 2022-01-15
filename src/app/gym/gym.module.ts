import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymRoutingModule } from './gym-routing.module';
import { GymComponent } from './gym.component';
import { GymListComponent } from './gym-list/gym-list.component';
import { GymDetailComponent } from './gym-detail/gym-detail.component';


@NgModule({
  declarations: [
    GymComponent,
    GymListComponent,
    GymDetailComponent
  ],
  imports: [
    CommonModule,
    GymRoutingModule
  ]
})
export class GymModule { }
