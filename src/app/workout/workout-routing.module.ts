import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutComponent } from './workout.component';

const routes: Routes = [
  {
    path: "", component: WorkoutComponent, children: [
      { path: "", component: WorkoutListComponent },
      { path: ":workoutId", component: WorkoutDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
