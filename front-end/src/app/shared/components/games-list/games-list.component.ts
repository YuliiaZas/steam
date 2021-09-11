import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameI } from 'src/app/core/models/game';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent {
  @Input()
  public games: GameI[] = [];
  @Input()
  public cardButtonMain!: string;
  @Input()
  public cardButtonAdditional: string | undefined;
  @Input()
  public hidePrice: boolean | undefined;

  @Output()
  sendDataFromCardsList = new EventEmitter<{[key in 'id' | 'button']: string}> ();
  
  getDataFromCard(data: {[key in 'id' | 'button']: string}) {
    this.sendDataFromCardsList.emit(data);
  }
}
