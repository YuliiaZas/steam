import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {
  public friends!: UserI[];
  public searchIsActive = false;
  private initialFriends!: UserI[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.friends = this.activatedRoute.snapshot.data.friends;
    this.initialFriends = this.activatedRoute.snapshot.data.friends;
  }

  public removeFriend(id: string) {
    this.userService.removeFriend$(id)
      .subscribe(result => {
        this.userService.getFriends$()
          .subscribe((newFriends: UserI[]) => {
            this.friends = newFriends;
            this.initialFriends = newFriends;
            this.stopSearching();
          });
      });
  }

  public addFriend(id: string) {
    this.userService.addFriend$(id)
      .subscribe(result => {
        this.userService.getFriends$()
          .subscribe((newFriends: UserI[]) => {
            this.friends = newFriends;
            this.initialFriends = newFriends;
            this.stopSearching();
          });
      });
  }

  public searchNewFriends(value: string) {
    this.searchIsActive = true;
    this.userService.searchUsersByNameOrEmailRequest$(value)
      .subscribe((result: UserI[]) => this.friends = result);
  }

  public stopSearching() {
    this.searchIsActive = false;
    this.friends = this.initialFriends;
  }

}
