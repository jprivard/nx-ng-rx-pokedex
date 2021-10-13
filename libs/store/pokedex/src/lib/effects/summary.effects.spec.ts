import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jest-marbles';

import { SummaryEffects } from './summary.effects';
import { PokemonService } from '../services/pokemon.service';
import { SummaryActions } from '../actions';
import { PokemonSummary } from '@pokedex/api-interfaces';

describe('Pokemon Effects', () => {

  describe.skip('Load', () => {
    test('calls the service to get data and dispatches result in loaded action', () => {
      const list = [{}] as PokemonSummary[];
      service.load.mockReturnValue(of(list));
      actions = hot('--a-', { a: SummaryActions.load({ size: 10, page: 0 }) });
      const expected = cold('--b', { b: SummaryActions.loaded({ list }) })
      expect(effects.load$).toBeObservable(expected);
    });
  });

  let actions: Observable<any>;
  let effects: SummaryEffects;
  const service = { load: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SummaryEffects,
        provideMockActions(() => actions),
        { provide: PokemonService, useValue: service }
      ]
    });
    effects = TestBed.inject(SummaryEffects);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
