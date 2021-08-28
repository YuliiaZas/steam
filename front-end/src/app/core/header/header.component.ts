import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  isLogined!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.checkAuth());
  }

  public checkAuth(): void {
    this.isLogined = this.authService.isAuthenticated();
  }
}
