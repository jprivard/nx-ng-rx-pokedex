import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jest-marbles';

import { PokemonEffects } from './pokemon.effects';
import { PokemonService } from '../services/pokemon.service';
import { PokemonActions } from '../actions';
import { Pokemon } from '@pokedex/api-interfaces';

describe('Pokemon Effects', () => {

  describe.skip('Load', () => {
    test('calls the service to get data and dispatches result in loaded action', () => {
      const list = [{}] as Pokemon[];
      service.load.mockReturnValue(of(list));
      actions = hot('--a-', { a: PokemonActions.load({ size: 10, page: 0 }) });
      const expected = cold('--b', { b: PokemonActions.loaded({ list }) })
      expect(effects.load$).toBeObservable(expected);
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
