import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryPageComponent } from './library-page.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: LibraryPageComponent
    }]),
    SharedModule,
  ],
  declarations: [
    LibraryPageComponent
  ],
  exports: [RouterModule]
})
export class LibraryPageModule { }
