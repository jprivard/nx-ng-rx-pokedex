import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Pokemon } from "@pokedex/api-interfaces";
import { hot } from "jest-marbles";
import { PokemonActions } from "./actions";
import { ProcessStatus } from "./enums/process-status.enum";
import { PokedexFacade } from './pokedex.facade';
import * as fromPokedex from './reducers';

describe('Pokedex Facade', () => {
  describe('Initialize', () => {
    test('dispatches load action, passing down parameters', () => {
      const options = { size: 10, page: 0 };
      facade.load(options);
      expect(dispatch).toHaveBeenCalledWith(PokemonActions.load(options));
    });

    describe('List', () => {
      test('returns list from Store', () => {
        const list = [ { id: 1 } ] as Pokemon[];
        setStore(list);
        expect(facade.list()).toBeObservable(hot('a', { a: list }));
      });
    });

    describe('IsLoading', () => {
      test('returns true when status is loading', () => {
        setStore([], ProcessStatus.loading);
        expect(facade.isLoading()).toBeObservable(hot('a', { a: true }));
      });

      test('returns false when status is normal', () => {
        setStore([], ProcessStatus.normal);
        expect(facade.isLoading()).toBeObservable(hot('a', { a: false }));
      });

      test('returns false when status is completed', () => {
        setStore([], ProcessStatus.completed);
        expect(facade.isLoading()).toBeObservable(hot('a', { a: false }));
      });

      test('returns false when status is failed', () => {
        setStore([], ProcessStatus.failed);
        expect(facade.isLoading()).toBeObservable(hot('a', { a: false }));
      });
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

  const setStore = (list: Pokemon[], status = ProcessStatus.completed) => {
    store.setState({
      pokedex: { ...fromPokedex.initialState,
        pokemon: { ...fromPokedex.initialState.pokemon,
          list,
          process: { ...fromPokedex.initialState.pokemon.process, status }
        }
      }
    });
  };
});
