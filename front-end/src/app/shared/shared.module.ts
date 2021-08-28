import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesListComponent } from '../shared/components/games-list/games-list.component';
import { SearchComponent } from './components/search/search.component';
import { GameCardComponent } from './components/game-card/game-card.component';


const PUBLIC_COMPONENTS: any[] = [
  GamesListComponent,
  SearchComponent,
  GameCardComponent,
];
const PUBLIC_DIRECTIVES: any[] = [];
const PUBLIC_PIPES: any[] = [];

@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
    // SearchComponent,
    // GameCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ...PUBLIC_COMPONENTS,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES,
  ],
})
export class SharedModule { }
