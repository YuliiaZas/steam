import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Location } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent{
  isLogined!:boolean;
  // location: string;

  constructor(private authService: AuthService, location: Location, router: Router) {
    // this.location = location.path();
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      console.log(event);
      this.checkAuth();
    })
  }

  // ngOnInit(): void {
  //   // if (this.location === '/login') {
  //   //   this.isLogined = false;
  //   // } else {
  //     // }
  //     console.log('oninit')
  // }
  public checkAuth(): void {
    console.log('checkAuth')
    this.isLogined = this.authService.isAuthenticated();
    console.log('checkAuth result for header', this.isLogined)
  }

}
