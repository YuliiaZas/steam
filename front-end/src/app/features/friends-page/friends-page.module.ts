import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FriendsPageComponent } from './friends-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: FriendsPageComponent
    }]),
  ],
  declarations: [
    FriendsPageComponent
  ],
  exports: [RouterModule]
})
export class FriendsPageModule { }
