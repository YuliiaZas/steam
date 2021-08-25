import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../core/auth/auth-guard.service';
import { LoginPageComponent } from '../features/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginPageComponent,
  }, {
    path: 'profile',
    loadChildren: () => import('../features/profile-page/profile-page.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  // }, {
  //   path: 'friends',
  // }, {
  //   path: 'games',

  // }, {
  //   path: 'library',
  // }, {
  //   path: '**',
  //   // component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
