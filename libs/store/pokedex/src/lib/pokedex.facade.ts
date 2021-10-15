import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PokemonSummary } from './interfaces/pokemon-summary.interface';
import { DetailsActions, SummaryActions } from './actions';
import * as queries from "./selectors";
import { PokemonDetails } from './interfaces/pokemon-details.interface';

@Injectable()
export class PokedexFacade {
  constructor(private store: Store) {}

  public loadList(options: { size: number, page: number }): void {
    this.store.dispatch(SummaryActions.load(options));
  }

  public loadPokemon(name: string): void {
    this.store.dispatch(DetailsActions.load({ name }));
  }

  public list(): Observable<PokemonSummary[]> {
    return this.store.select(queries.summary.selectList);
  }

  public pokemon(): Observable<PokemonDetails | null> {
    return this.store.select(queries.details.selectPokemon);
  }

  public isListLoading(): Observable<boolean> {
    return this.store.select(queries.summary.selectLoading);
  }

  public isPokemonLoading(): Observable<boolean> {
    return this.store.select(queries.details.selectLoading);
  }
}
