import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './routing/app-routing.module';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { HeaderComponent } from './core/header/header.component';
import { AuthService } from './core/auth/auth.service';

// export function tokenGetter() {
//   console.log('tokenGetter', localStorage.getItem('token'))
//   return localStorage.getItem('token');
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.tokenGetter,
        // allowedDomains: ['localhost:58721']
      }
    }),
    FormsModule,
    // ProfilePageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // exports: [
  //   HeaderComponent
  // ]
})
export class AppModule { }
