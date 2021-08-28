import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserI } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public loginRequest(formValue: UserI): Observable<string> {
    const {email, password} = formValue;
    return this.http.post('api/auth/login', {email, password})
    .pipe(map((tokenData: any) => tokenData.token));
  }
}
