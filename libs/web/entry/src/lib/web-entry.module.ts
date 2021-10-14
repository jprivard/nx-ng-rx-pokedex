import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { EntryPage } from './pages/entry.page';
import { PokedexFacade } from '@pokedex/store/pokedex';

export const webEntryRoutes: Route[] = [
  { path: '', component: EntryPage }
];

@NgModule({
  declarations: [EntryPage],
  imports: [CommonModule, RouterModule.forChild(webEntryRoutes)],
  providers: [PokedexFacade]
})
export class WebEntryModule {}
