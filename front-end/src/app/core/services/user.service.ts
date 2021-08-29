import { HttpClient, HttpParams } from '@angular/common/http';
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

  public searchUsersByNameOrEmailRequest$(value: string): Observable<UserI[]> {
    const params = new HttpParams().set('name', value).set('email', value);
    return this.http.get<UserI[]>('api/friends/search', {params});
  }

  public addFriend$(id: string): Observable<any> {
    return this.http.patch(`api/friends/add/${id}`, {});
  }

  public removeFriend$(id: string): Observable<any> {
    return this.http.patch(`api/friends/remove/${id}`, {});
  }
}
