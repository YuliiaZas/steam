import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable} from 'rxjs';
import { GamesService } from '../services/games.service';
import { GameI } from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class LibraryResolver implements Resolve<GameI[]> {
  public constructor(
    private readonly gameService: GamesService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GameI[]> {
    return this.gameService.getUserGames$();
  }
}
