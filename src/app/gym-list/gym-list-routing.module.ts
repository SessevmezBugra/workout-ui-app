import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymListComponent } from './gym-list/gym-list.component';

const routes: Routes = [
  { path: '', component: GymListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymListRoutingModule { }
