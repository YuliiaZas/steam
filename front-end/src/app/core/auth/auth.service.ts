import { Injectable } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { }
  constructor(public jwtHelper: JwtHelperService) { }

  static tokenGetter(): string | null {
    console.log('tokenGetter', localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  public logOutUser(): void {
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    // console.log(true);
    // return true;
    // const token = localStorage.getItem('token');
    // console.log('isAuthenticated', token);
    return !this.jwtHelper.isTokenExpired();
    // return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
