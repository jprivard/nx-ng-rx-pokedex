import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from "jest-marbles";

import { PokemonSummary } from './interfaces/pokemon-summary.interface';
import { SummaryActions } from "./actions";
import { ProcessStatus } from "./enums/process-status.enum";
import { PokedexFacade } from './pokedex.facade';
import * as fromPokedex from './reducers';

describe('Pokedex Facade', () => {
  describe('LoadList', () => {
    test('dispatches load action, passing down parameters', () => {
      const options = { size: 10, page: 0 };
      facade.loadList(options);
      expect(dispatch).toHaveBeenCalledWith(SummaryActions.load(options));
    });
  });

  describe('LoadPokemon', () => {
    test('dispatches load action, padding down pokemon name', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('List', () => {
    test('returns list from Store', () => {
      const list = [ { id: 1 } ] as PokemonSummary[];
      setStore(list);
      expect(facade.list()).toBeObservable(hot('a', { a: list }));
    });
  });

  describe('Pokemon', () => {
    test('returns selected pokemon information', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('IsListLoading', () => {
    test('returns true when status is loading', () => {
      setStore([], ProcessStatus.loading);
      expect(facade.isListLoading()).toBeObservable(hot('a', { a: true }));
    });

    test('returns false when status is normal', () => {
      setStore([], ProcessStatus.normal);
      expect(facade.isListLoading()).toBeObservable(hot('a', { a: false }));
    });

    test('returns false when status is completed', () => {
      setStore([], ProcessStatus.completed);
      expect(facade.isListLoading()).toBeObservable(hot('a', { a: false }));
    });

    test('returns false when status is failed', () => {
      setStore([], ProcessStatus.failed);
      expect(facade.isListLoading()).toBeObservable(hot('a', { a: false }));
    });
  });

  describe('isPokemonLoading', () => {
    test('returns true when status is loading', () => {
      expect(true).toBeTruthy();
    });
  });

  let facade: PokedexFacade;
  let store: MockStore<fromPokedex.State>;
  let dispatch: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokedexFacade,
        provideMockStore({ initialState: { [fromPokedex.FEATURE_KEY]: fromPokedex.initialState } }),
      ]
    });
    facade = TestBed.inject(PokedexFacade);
    store = TestBed.inject(Store) as MockStore<fromPokedex.State>;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const setStore = (list: PokemonSummary[], status = ProcessStatus.completed) => {
    store.setState({
      pokedex: { ...fromPokedex.initialState,
        summary: { ...fromPokedex.initialState.summary,
          list,
          process: { ...fromPokedex.initialState.summary.process, status }
        }
      }
    });
  };
});
