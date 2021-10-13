import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PokemonSummary } from './models/pokemon-summary.interface';
import { SummaryActions } from './actions';
import * as queries from "./selectors";


@Injectable()
export class PokedexFacade {
  constructor(private store: Store) {}

  public load(options: { size: number, page: number }): void {
    this.store.dispatch(SummaryActions.load(options));
  }

  public list(): Observable<PokemonSummary[]> {
    return this.store.select(queries.summary.selectList);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(queries.summary.selectLoading);
  }
}
