import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) { }

  static tokenGetter(): string | null {
    console.log('tokenGetter', localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  public logInUser(token: string): void {
    localStorage.setItem('token', token);
    const {_id: userId, email} = this.jwtHelper.decodeToken(token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', email);
  }

  public logOutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }
}
