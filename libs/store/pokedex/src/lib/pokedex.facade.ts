import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonActions } from './actions';
import { PokedexModuleState } from './reducers';

@Injectable()
export class PokedexFacade {
  constructor(private store: Store<PokedexModuleState>) {}

  public initialize() {
    this.store.dispatch(PokemonActions.initialize());
  }
}
