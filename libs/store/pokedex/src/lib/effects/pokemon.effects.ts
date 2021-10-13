import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PokemonActions } from '../actions';

import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private service: PokemonService
  ) {}

  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.initialize),
      map(() => PokemonActions.load({ id: 1 }))
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.load),
      mergeMap(({ id }) => this.service.load(id).pipe(
        map(pokemon => PokemonActions.loaded({ pokemon })),
        catchError((error) => of(PokemonActions.failed({ error })))
      ))
    )
  );

  loaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loaded),
      map(({ pokemon }) => pokemon.id < 10
        ? PokemonActions.load({ id : pokemon.id + 1 })
        : PokemonActions.initialized()
      )
    )
  );
}
