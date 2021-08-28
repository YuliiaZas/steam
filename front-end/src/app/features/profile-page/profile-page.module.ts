import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: ProfilePageComponent
    }])
  ],
  declarations: [
    ProfilePageComponent
  ],
  exports: [RouterModule]
})
export class ProfilePageModule { }
