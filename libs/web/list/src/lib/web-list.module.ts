import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { ListPage } from './pages/list.page';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { WebSpinnerModule } from '@pokedex/web/spinner';
import { COMPONENTS } from './components';
import { StorePokedexModule } from '@pokedex/store/pokedex';

export const webListRoutes: Route[] = [
  { path: '', component: ListPage },
  { path: ':id', loadChildren: () => import('@pokedex/web/entry').then((m) => m.WebEntryModule) },
];

@NgModule({
  declarations: [ ListPage, ...COMPONENTS ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterModule.forChild(webListRoutes),
    WebSpinnerModule,
    StorePokedexModule,
  ],
})
export class WebListModule {}
