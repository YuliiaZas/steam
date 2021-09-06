import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {
  @ViewChild(SearchComponent)
  private searchComponent!: SearchComponent;

  public friends!: UserI[];
  private initialFriends!: UserI[];
  public searchValue = '';

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
          });
      });
  }

  public addFriend(id: string) {
    this.userService.addFriend$(id)
      .subscribe(result => {
        this.searchComponent.clearSearchForm();
        this.searchValue = '';

        this.userService.getFriends$()
          .subscribe((newFriends: UserI[]) => {
            this.friends = newFriends;
            this.initialFriends = newFriends;
          });
      });
  }

  public searchNewFriends(value: string) {
    this.searchValue = value;
    this.userService.searchUsersByNameOrEmailRequest$(value)
      .subscribe((result: UserI[]) => {
        this.friends = result;
      });
  }

  public stopSearching() {
    this.friends = this.initialFriends;
    this.searchValue = '';
  }

}
