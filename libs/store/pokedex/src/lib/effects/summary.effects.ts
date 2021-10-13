import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { forkJoin, of, throwError } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';

import { SummaryActions } from '../actions';
import { PokemonService } from '../services/pokemon.service';
import { FactoryService } from '../services/factory.service';

@Injectable()
export class SummaryEffects {
  constructor(
    private actions$: Actions,
    private service: PokemonService,
    private factory: FactoryService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SummaryActions.load),
      exhaustMap(({ page, size }) =>
        this.service.load(size, page * 10).pipe(
          mergeMap(resp => forkJoin(resp.results.map(result =>
            this.service.getPokemonSummary(result.url).pipe(
              catchError(error => throwError(error))
            )
          ))),
          map(list => list.map(response => this.factory.toPokemonSummary(response))),
          map(list => SummaryActions.loaded({ list })),
          catchError(error => of(SummaryActions.failed({ error }))),
        )
      ),
    )
  );
}
