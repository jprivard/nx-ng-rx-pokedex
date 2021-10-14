import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { PokedexFacade } from '@pokedex/store/pokedex';
import { WebSpinnerModule } from '@pokedex/web/spinner';
import { EntryPage } from './pages/entry.page';

export const webEntryRoutes: Route[] = [
  { path: '', component: EntryPage }
];

@NgModule({
  declarations: [EntryPage],
  imports: [
    CommonModule,
    MatCardModule,
    WebSpinnerModule,
    RouterModule.forChild(webEntryRoutes)
  ],
  providers: [PokedexFacade]
})
export class WebEntryModule {}
