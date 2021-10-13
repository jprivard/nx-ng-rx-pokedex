import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';

import { PokemonSummary } from '../models/pokemon-summary.interface';
import { SummaryActions } from '../actions';
import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class SummaryEffects {
  constructor(
    private actions$: Actions,
    private service: PokemonService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SummaryActions.load),
      exhaustMap(({ page, size }) =>
        this.service.load(size, page * 10).pipe(
          mergeMap(resp => forkJoin(resp.results.map(result => this.service.getPokemonSummary(result.url)))),
          map(list => list.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name[0].toUpperCase() + pokemon.name.substring(1),
            sprite: pokemon.sprites.front_default,
            types: pokemon.types.map(type => type.type.name)
          } as PokemonSummary))),
          map(list => SummaryActions.loaded({ list })),
          catchError(error => of(SummaryActions.failed({ error }))),
        )
      ),
    )
  );
}
