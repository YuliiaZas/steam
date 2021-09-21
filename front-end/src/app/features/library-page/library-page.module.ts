import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryPageComponent } from './library-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: LibraryPageComponent
    }]),
  ],
  declarations: [
    LibraryPageComponent
  ],
  exports: [RouterModule]
})
export class LibraryPageModule { }
