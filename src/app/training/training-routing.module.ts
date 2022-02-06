import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingComponent } from './training.component';

const routes: Routes = [
  {
    path: "", component: TrainingComponent, children: [
      { path: "", component: TrainingListComponent },
      { path: ":trainingId", component: TrainingDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
