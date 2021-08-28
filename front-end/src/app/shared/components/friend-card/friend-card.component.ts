import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserI } from 'src/app/core/models/user';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent {
  @Input()
  public friend!: UserI;
  @Input()
  public abilityToAdd!: boolean;
  @Input()
  public abilityToRemove!: boolean;

  @Output()
  sendIdToAddFromCard = new EventEmitter<string> ();

  @Output()
  sendIdToRemoveFromCard = new EventEmitter<string> ();

  clickAdd(id: string) {
    this.sendIdToAddFromCard.emit(id);
  }
  clickRemove(id: string) {
    this.sendIdToRemoveFromCard.emit(id);
  }
}
