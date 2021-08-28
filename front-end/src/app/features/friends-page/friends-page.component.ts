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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data);
    console.log(this.activatedRoute.snapshot.data.friends)
    this.friends = this.activatedRoute.snapshot.data.friends;
    console.log("🚀 ~ file: friends-page.component.ts ~ line 22 ~ FriendsPageComponent ~ ngOnInit ~ this.friends", this.friends)
  }

  public removeFriend(id: any) {
    
  }

  public addFriend(id: any) {

  }
  public searchFriends(value: string) {

  }
  // public addToLibrary(data: {[key in 'id' | 'button']: string}) {
  //   this.gamesService.addToLibraryRequest$(data.id)
  //     .subscribe(result => {
  //       this.gamesService.getNewGames$()
  //         .subscribe((newGames: GameI[]) => this.games = newGames);
  //     });
  // }

  // public searchGameByName(value: string) {
  //   console.log(value);
  //   this.gamesService.searchGameByNameRequest$(value)
  //     .subscribe((result: GameI[]) => this.games = result);
  // }

}
