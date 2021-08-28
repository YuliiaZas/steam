import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from '../core/auth/auth-guard.service';
import { LoginPageComponent } from '../features/login-page/login-page.component';
import { UserResolver } from '../core/guards/user-resolver';
import { GamesResolver } from '../core/guards/games-resolver';
import { LibraryResolver } from '../core/guards/library-resolver';
import { FriendsResolver } from '../core/guards/friends-resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginPageComponent,
  }, {
    path: 'profile',
    loadChildren: () => import('../features/profile-page/profile-page.module')
      .then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver,
    }
  }, {
    path: 'friends',
    loadChildren: () => import('../features/friends-page/friends-page.module')
      .then(m => m.FriendsPageModule),
    canActivate: [AuthGuard],
    resolve: {
      friends: FriendsResolver,
    }
  }, {
    path: 'games',
    loadChildren: () => import('../features/games-page/games-page.module')
      .then(m => m.GamesPageModule),
    canActivate: [AuthGuard],
    resolve: {
      games: GamesResolver,
      user: UserResolver,
    }
  }, {
    path: 'library',
    loadChildren: () => import('../features/library-page/library-page.module')
      .then(m => m.LibraryPageModule),
    canActivate: [AuthGuard],
    resolve: {
      userGames: LibraryResolver,
    }
  // }, {
  //   path: '**',
  //   // component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
