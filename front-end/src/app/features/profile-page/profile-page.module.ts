import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
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
