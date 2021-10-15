import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jest-marbles';

import { fixture } from '@pokedex/api-interfaces';
import { DetailsEffects } from './details.effects';
import { PokemonService } from '../services/pokemon.service';
import { DetailsActions } from '../actions';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';

describe('Details Effects', () => {

  describe('Load', () => {
    test('calls the service to get PokemonDetail, dispatches loaded', () => {
      const pokemon = { id: 1 } as PokemonDetails;
      service.getPokemonDetails.mockReturnValue(of(pokemon));
      actions = hot('--a-', { a: DetailsActions.load({ name: 'bulbusaur' }) });
      const expected = cold('--b', { b: DetailsActions.loaded({ pokemon }) })
      expect(effects.load$).toBeObservable(expected);
    });

    test('dispatches failed when call throws exception', () => {
      const error = new Error('error');
      service.getPokemonDetails.mockReturnValue(throwError(error));
      actions = hot('--a-', { a: DetailsActions.load({ name: 'bulbusaur' }) });
      const expected = cold('--b', { b: DetailsActions.failed({ error }) })
      expect(effects.load$).toBeObservable(expected);
    });
  });

  let actions = new Observable<Action>();
  let effects: DetailsEffects;
  const service = { getPokemonDetails: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DetailsEffects,
        provideMockActions(() => actions),
        { provide: PokemonService, useValue: service }
      ]
    });
    effects = TestBed.inject(DetailsEffects);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
