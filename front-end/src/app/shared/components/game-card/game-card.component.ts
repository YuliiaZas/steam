import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameI } from 'src/app/core/models/game';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'ua');

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input()
  public game!: GameI;
  @Input()
  public cardButtonMain!: string;
  @Input()
  public cardButtonAdditional: string | undefined;
  @Input()
  public hidePrice: boolean | undefined;

  @Output()
  sendIdFromCard = new EventEmitter<{[key in 'id' | 'button']: string}> ();
  
  clickButton(id: string, button: string) {
    this.sendIdFromCard.emit({id, button});
  }
}
