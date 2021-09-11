import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesPageComponent } from './games-page.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: GamesPageComponent
    }]),
    SharedModule,
  ],
  declarations: [
    GamesPageComponent
  ],
  exports: [RouterModule]
})
export class GamesPageModule { }
