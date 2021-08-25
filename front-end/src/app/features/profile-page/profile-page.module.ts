import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';



// @NgModule({
//   declarations: [
//     ProfilePageComponent
//   ],
//   imports: [
//     CommonModule
//   ]
// })


import { Routes, RouterModule } from '@angular/router';



// const routes: Routes = [
//   {
//     path: '',
//     component: ProfilePageComponent
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    component: ProfilePageComponent
  }])],
  exports: [RouterModule]
})
export class ProfilePageModule { }
