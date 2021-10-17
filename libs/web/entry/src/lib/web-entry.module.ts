import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { PokedexFacade } from '@pokedex/store/pokedex';
import { WebSpinnerModule } from '@pokedex/web/spinner';
import { COMPONENTS } from './components';
import { EntryPage } from './pages/entry.page';
import { ReformatPipe } from './pipes/reformat.pipe';

export const webEntryRoutes: Route[] = [
  { path: '', component: EntryPage }
];

@NgModule({
  declarations: [...COMPONENTS, EntryPage, ReformatPipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    WebSpinnerModule,
    RouterModule.forChild(webEntryRoutes)
  ],
  providers: [PokedexFacade]
})
export class WebEntryModule {}
