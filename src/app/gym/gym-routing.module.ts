import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymDetailComponent } from './gym-detail/gym-detail.component';
import { GymUserListComponent } from './gym-user-list/gym-user-list.component';

const routes: Routes = [
  {

    path: "", component: GymDetailComponent, children: [
      { path: 'user', component: GymUserListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
