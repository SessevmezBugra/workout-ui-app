import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "/training", pathMatch: "full" },
  { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule), },
  { path: 'user/:userId', loadChildren: () => import('./user/user.module').then(m => m.UserModule), },
  { path: 'gym', loadChildren: () => import('./gym/gym.module').then(m => m.GymModule), },
  { path: '**', component: PageNotFoundComponent }
  // { path: '**', redirectTo: "/training", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
