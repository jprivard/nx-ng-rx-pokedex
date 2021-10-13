import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';

import { PokemonActions } from '../actions';
import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private service: PokemonService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.load),
      exhaustMap(({ page, size }) =>
        this.service.load(size, page * 10).pipe(
          mergeMap((resp : { results: any[] }) =>
            forkJoin(resp.results.map(result => this.service.getPokemon(result.name))),
          ),
          map(list => PokemonActions.loaded({ list })),
          catchError(error => of(PokemonActions.failed({ error }))),
        )
      ),
    )
  );
}
