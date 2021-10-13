import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pokemon', loadChildren: () => import('@pokedex/web/list').then((m) => m.WebListModule) },
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
