import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameI } from 'src/app/core/models/game';
import { UserI } from 'src/app/core/models/user';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {
  public games!: GameI[];
  public user!: UserI;
  private initialGames!: GameI[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gamesService: GamesService,
  ) { }

  ngOnInit(): void {
    this.games = this.activatedRoute.snapshot.data.games;
    this.user = this.activatedRoute.snapshot.data.user;
    this.initialGames = this.activatedRoute.snapshot.data.games;
  }

  public addToLibrary(data: {[key in 'id' | 'button']: string}) {
    this.gamesService.addToLibraryRequest$(data.id)
      .subscribe(result => {
        this.gamesService.getNewGames$()
          .subscribe((newGames: GameI[]) => {
            this.games = newGames;
            this.initialGames = newGames;
          });
      });
  }

  public searchGameByName(value: string) {
    console.log(value);
    this.gamesService.searchGameByNameRequest$(value)
      .subscribe((result: GameI[]) => this.games = result);
  }
  
  public stopSearching() {
    this.games = this.initialGames;
  }
}
