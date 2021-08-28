import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameI } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(
    private http: HttpClient,
  ) { }

  public getNewGames$ (): Observable<GameI[]> {
    return this.http.get<GameI[]>('api/games');
  }

  public getGame$ (id: string): Observable<GameI> {
    return this.http.get<GameI>(`api/games/${id}`);
  }

  public getUserGames$ (): Observable<GameI[]> {
    return this.http.get<GameI[]>('api/games/my');
  }

  public addToLibraryRequest$ (id: string): Observable<any> {
    return this.http.patch(`api/games/${id}`, {});
  }

  public searchGameByNameRequest$ (value: string): Observable<GameI[]> {
    const params = new HttpParams().set('name', value);
    return this.http.get<GameI[]>('api/games/search', {params});
    // return this.http.get<GameI[]>(`api/games/search/name=${value}`, {name: value});
  }
}
