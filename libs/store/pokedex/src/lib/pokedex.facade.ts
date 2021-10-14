import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { PokemonSummary } from './interfaces/pokemon-summary.interface';
import { SummaryActions } from './actions';
import * as queries from "./selectors";
import { PokemonDetails } from './interfaces/pokemon-details.interface';

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

  public pokemon(): Observable<PokemonDetails> {
    return of();
  }

  public isListLoading(): Observable<boolean> {
    return this.store.select(queries.summary.selectLoading);
  }

  public isPokemonLoading(): Observable<boolean> {
    return of(true);
  }
}
