import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { hot, cold } from 'jest-marbles';

import { fixture } from '@pokedex/api-interfaces';
import { SummaryEffects } from './summary.effects';
import { PokemonService } from '../services/pokemon.service';
import { SummaryActions } from '../actions';
import { pokemonSummary } from '../fixtures/pokemon-summary.fixture';

describe('Summary Effects', () => {
  describe('Load', () => {
    it('calls the service to get list, individual items and factory to return PokemonSummary[]', () => {
      service.load
        .mockReturnValue(of(fixture.list));
      service.getPokemonSummary
        .mockReturnValueOnce(of(pokemonSummary[0]))
        .mockReturnValueOnce(of(pokemonSummary[1]))
        .mockReturnValueOnce(of(pokemonSummary[2]));
      actions = hot('--a-', { a: SummaryActions.load({ size: 10, page: 0 }) });
      const expected = cold('--b', { b: SummaryActions.loaded({ list: pokemonSummary }) })
      expect(effects.load$).toBeObservable(expected);
    });

    it('returns failed when list call throws exception', () => {
      const error = new Error('error');
      service.load.mockReturnValue(throwError(error));
      actions = hot('--a-', { a: SummaryActions.load({ size: 10, page: 0 }) });
      const expected = cold('--b', { b: SummaryActions.failed({ error }) })
      expect(effects.load$).toBeObservable(expected);
    });

    it('returns failed when one of the individual call throws exception', () => {
      const error = new Error('error');
      service.load.mockReturnValue(of(fixture.list));
      service.getPokemonSummary.mockReturnValue(throwError(error));
      actions = hot('--a-', { a: SummaryActions.load({ size: 10, page: 0 }) });
      const expected = cold('--b', { b: SummaryActions.failed({ error }) })
      expect(effects.load$).toBeObservable(expected);
    });
  });

  let actions = new Observable<Action>();
  let effects: SummaryEffects;
  const service = { load: jest.fn(), getPokemonSummary: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SummaryEffects,
        provideMockActions(() => actions),
        { provide: PokemonService, useValue: service },
      ]
    });
    effects = TestBed.inject(SummaryEffects);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
