import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jest-marbles';

import { PokemonEffects } from './pokemon.effects';
import { PokemonService } from '../services/pokemon.service';
import { PokemonActions } from '../actions';
import { Pokemon } from '@pokedex/api-interfaces';

describe('Pokemon Effects', () => {
  describe('Initialize', () => {
    test('returns a load action for the first pokemon', () => {
      actions = hot('--a-', { a: PokemonActions.initialize() });
      const expected = cold('--b', { b: PokemonActions.load({ id: 1 }) })
      expect(effects.initialize$).toBeObservable(expected);
    });
  });

  describe('Load', () => {
    test('calls the service to get data and dispatches result in loaded action', () => {
      const pokemon = {} as Pokemon;
      service.load.mockReturnValue(of(pokemon));
      actions = hot('--a-', { a: PokemonActions.load({ id: 1 }) });
      const expected = cold('--b', { b: PokemonActions.loaded({ pokemon }) })
      expect(effects.load$).toBeObservable(expected);
    });

    test('dispatches failed if something goes wrong', () => {
      const error = new Error();
      service.load.mockReturnValue(throwError(error));
      actions = hot('--a-', { a: PokemonActions.load({ id: 1 }) });
      const expected = cold('--b', { b: PokemonActions.failed({ error }) })
      expect(effects.load$).toBeObservable(expected);
    });
  });

  describe('Loaded', () => {
    test('dispatches the following pokemon id load action if below certain treshold', () => {
      const pokemon = { id: 1 } as Pokemon;
      service.load.mockReturnValue(of(pokemon));
      actions = hot('--a-', { a: PokemonActions.loaded({ pokemon }) });
      const expected = cold('--b', { b: PokemonActions.load({ id: 2 }) })
      expect(effects.loaded$).toBeObservable(expected);
    });

    test('dispatches the initialized action if above the treshold', () => {
      const pokemon = { id: 100 } as Pokemon;
      service.load.mockReturnValue(of(pokemon));
      actions = hot('--a-', { a: PokemonActions.loaded({ pokemon }) });
      const expected = cold('--b', { b: PokemonActions.initialized() })
      expect(effects.loaded$).toBeObservable(expected);
    });
  });

  let actions: Observable<any>;
  let effects: PokemonEffects;
  const service = { load: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonEffects,
        provideMockActions(() => actions),
        { provide: PokemonService, useValue: service }
      ]
    });
    effects = TestBed.inject(PokemonEffects);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
