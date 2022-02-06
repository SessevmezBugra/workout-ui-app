import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymDetailComponent } from './gym-detail/gym-detail.component';
import { GymListComponent } from './gym-list/gym-list.component';
import { GymComponent } from './gym.component';

const routes: Routes = [
  {
    path: "", component: GymComponent,
    children: [
      { path: "", component: GymListComponent },
      {
        path: ":id", component: GymDetailComponent, children: [
          { path: 'user', loadChildren: () => import('../user-list/user-list.module').then(m => m.UserListModule), }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
