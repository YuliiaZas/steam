import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameI } from 'src/app/core/models/game';
import { GamesService } from 'src/app/core/services/games.service';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {
  @ViewChild(SearchComponent)
  private searchComponent!: SearchComponent;

  public games!: GameI[];
  private initialGames!: GameI[];
  public searchValue = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gamesService: GamesService,
  ) { }

  ngOnInit(): void {
    this.games = this.activatedRoute.snapshot.data.games;
    this.initialGames = this.activatedRoute.snapshot.data.games;
  }

  public addToLibrary(data: {[key in 'id' | 'button']: string}): void {
    this.gamesService.addToLibraryRequest$(data.id)
      .subscribe(result => {
        this.searchComponent.clearSearchForm();
        this.searchValue = '';

        this.gamesService.getNewGames$()
          .subscribe((newGames: GameI[]) => {
            this.games = newGames;
            this.initialGames = newGames;
          });
      });
  }

  public searchGameByName(value: string): void {
    this.gamesService.searchGameByNameRequest$(value)
      .subscribe((result: GameI[]) => {
        this.games = result;
        this.searchValue = value;
      });
  }
  
  public stopSearching(): void {
    this.games = this.initialGames;
    this.searchValue = '';
  }
}
