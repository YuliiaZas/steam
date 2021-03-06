import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserI } from 'src/app/core/models/user';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent {
  @Input()
  public friends: UserI[] = [];
  @Input()
  public abilityToAdd!: boolean;
  @Input()
  public abilityToRemove!: boolean;

  @Output()
  sendIdToAddFromCardsList = new EventEmitter<string> ();
  
  @Output()
  sendIdToRemoveFromCardsList = new EventEmitter<string> ();
  
  getIdToAddFromCard(id: string) {
    this.sendIdToAddFromCardsList.emit(id);
  }

  getIdToRemoveFromCard(id: string) {
    this.sendIdToRemoveFromCardsList.emit(id);
  }
}
