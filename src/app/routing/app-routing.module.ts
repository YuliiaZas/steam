import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginPageComponent,
  // }, {
  //   path: 'profile',
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
