import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesPageComponent } from './games-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: GamesPageComponent
    }]),
  ],
  declarations: [
    GamesPageComponent
  ],
  exports: [RouterModule]
})
export class GamesPageModule { }
