import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GameI } from 'src/app/core/models/game';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss']
})
export class LibraryPageComponent implements OnInit {
  public userGames!: GameI[];
  public copyGroup = new FormGroup({
    copy: new FormControl(null)
  })
  private link = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gamesService: GamesService,
  ) { }

  ngOnInit(): void {
    this.userGames = this.activatedRoute.snapshot.data.userGames;
  }

  public processAction(data: {[key in 'id' | 'button']: string}) {
    if (data.button === 'cardButtonMain') {
      this.downloadGame(data.id);
    } else {
      this.shareGame(data.id);
    }
  }

  public downloadGame(id:string) {
    this.gamesService.getGame$(id)
      .subscribe((game: GameI) => {
        alert(`${game.name} is downloading`);
      });
  }

  public shareGame(id:string) {
    this.link = `${location.origin}/games/${id}`;
    this.copyGroup.setValue({copy: this.link});
    const copyText = document.querySelector("#copy") as HTMLInputElement;
    copyText.select();
    document.execCommand("copy");
    this.link = '';
    this.copyGroup.reset();
  }
}
