import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromPokedex from './reducers';
import { effects } from './effects';
import { PokemonService } from './services/pokemon.service';
import { PokedexFacade } from './pokedex.facade';
import { FactoryService } from './services/factory.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromPokedex.FEATURE_KEY, fromPokedex.reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [ PokedexFacade, PokemonService, FactoryService ]
})
export class StorePokedexModule {}
