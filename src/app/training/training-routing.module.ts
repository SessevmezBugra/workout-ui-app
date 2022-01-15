import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { TrainingListComponent } from './training-list/training-list.component';

const routes: Routes = [
  { path: 'training', component: TrainingListComponent },
  { path: 'training/:id', component: TrainingDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
