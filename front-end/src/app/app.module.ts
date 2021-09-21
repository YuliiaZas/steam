import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './routing/app-routing.module';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { HeaderComponent } from './core/header/header.component';
import { AuthService } from './core/auth/auth.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.tokenGetter,
        allowedDomains: ['localhost:4201'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
