import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PokemonSummary } from './models/pokemon-summary.interface';
import { SummaryActions } from './actions';
import * as queries from "./selectors";


@Injectable()
export class PokedexFacade {
  constructor(private store: Store) {}

  public loadList(options: { size: number, page: number }): void {
    this.store.dispatch(SummaryActions.load(options));
  }

  public loadPokemon(name: string): void {
    console.log(name);
  }

  public list(): Observable<PokemonSummary[]> {
    return this.store.select(queries.summary.selectList);
  }

  public isListLoading(): Observable<boolean> {
    return this.store.select(queries.summary.selectLoading);
  }
}
