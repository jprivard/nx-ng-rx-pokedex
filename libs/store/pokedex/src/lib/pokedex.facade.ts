import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pokemon } from '@pokedex/api-interfaces';
import { PokemonActions } from './actions';
import * as queries from "./selectors";


@Injectable()
export class PokedexFacade {
  constructor(private store: Store) {}

  public load(options: { size: number, page: number }): void {
    this.store.dispatch(PokemonActions.load(options));
  }

  public list(): Observable<Pokemon[]> {
    return this.store.select(queries.pokemon.selectList);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(queries.pokemon.selectLoading);
  }
}
