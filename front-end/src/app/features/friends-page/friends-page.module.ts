import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FriendsPageComponent } from './friends-page.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: FriendsPageComponent
    }]),
    SharedModule,
  ],
  declarations: [
    FriendsPageComponent
  ],
  exports: [RouterModule]
})
export class FriendsPageModule { }
