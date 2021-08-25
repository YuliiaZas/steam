import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public login (formValue: User) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // localStorage.setItem('token', 'null');
    const {email, password} = formValue;
    // const token = 
    return this.http.post('api/auth/login', {email, password})
    .pipe(map((tokenData: any) => {
      console.log('login.service.ts = tokenData =', tokenData);
      const {token, error} = tokenData;
      if (token) {
        console.log('login.service.ts = token =', token);
        localStorage.setItem('token', token);
        return {token};
      }
      console.log('login.service.ts = error =', error);
      return {error};
    }));
    // localStorage.setItem('token', token);
    // console.log("🚀 ~ file: login.service.ts ~ line 17 ~ LoginService ~ login ~ token", token)
    // return {success: false, message: 'User is not loggined'};
  }
}
