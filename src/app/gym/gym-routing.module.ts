import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymDetailComponent } from './gym-detail/gym-detail.component';
import { GymListComponent } from './gym-list/gym-list.component';

const routes: Routes = [
  {path: "gym", component: GymListComponent},
  {path: "gym/:id", component: GymDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
