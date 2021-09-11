import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable} from 'rxjs';
import { UserI } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsResolver implements Resolve<UserI[]> {
  public constructor(
    private readonly userService: UserService,
  ) { }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserI[]> {
    return this.userService.getFriends$();
  }
}
