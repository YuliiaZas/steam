import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesPageComponent } from './games-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
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
