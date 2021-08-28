import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  public getUser$(): Observable<UserI> {
    return this.http.get<UserI>('api/profile');
  }

  public getFriends$(): Observable<UserI[]> {
    return this.http.get<UserI[]>('api/friends')
  }
}
