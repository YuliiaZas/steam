import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable} from 'rxjs';
import { UserI } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserI> {
  public constructor(
    private readonly userService: UserService,
  ) { }
  public resolve(): Observable<UserI> {
    return this.userService.getUser$();
  }
}
