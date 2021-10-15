import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import { DetailsActions } from '../actions';
import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class DetailsEffects {
  constructor(private actions$: Actions, private service: PokemonService) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.load),
      exhaustMap(({ name }) =>
        this.service.getPokemonDetails(name).pipe(
          map(pokemon => DetailsActions.loaded({ pokemon })),
          catchError(error => of(DetailsActions.failed({ error }))),
        )
      ),
    );
  });
}
