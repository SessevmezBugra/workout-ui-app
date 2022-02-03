import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "/workout", pathMatch: "full" },
  { path: 'workout', loadChildren: () => import('./workout/workout.module').then(m => m.WorkoutModule), },
  { path: 'gym', loadChildren: () => import('./gym/gym.module').then(m => m.GymModule), },
  { path: '**', component: PageNotFoundComponent }
  // { path: '**', redirectTo: "/training", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
