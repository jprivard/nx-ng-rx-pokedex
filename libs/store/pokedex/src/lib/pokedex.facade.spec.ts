import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from "jest-marbles";

import { PokemonSummary } from './interfaces/pokemon-summary.interface';
import { DetailsActions, SummaryActions } from "./actions";
import { ProcessStatus } from "./enums/process-status.enum";
import { PokedexFacade } from './pokedex.facade';
import * as fromPokedex from './reducers';
import { PokemonDetails } from "./interfaces/pokemon-details.interface";

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
      const name = 'bulbasaur';
      facade.loadPokemon(name);
      expect(dispatch).toHaveBeenCalledWith(DetailsActions.load({ name }));
    });
  });

  describe('List', () => {
    test('returns list from Store', () => {
      const list = [ { id: 1 } ] as PokemonSummary[];
      setSummaryStore(list);
      expect(facade.list()).toBeObservable(hot('a', { a: list }));
    });
  });

  describe('Pokemon', () => {
    test('returns selected pokemon information', () => {
      const pokemon = { id: 1 } as PokemonDetails;
      setDetailsStore(pokemon);
      expect(facade.pokemon()).toBeObservable(hot('a', { a : pokemon }));
    });
  });

  describe('IsListLoading', () => {
    test('returns true when status is loading', () => {
      setSummaryStore([], ProcessStatus.loading);
      expect(facade.isListLoading()).toBeObservable(hot('a', { a: true }));
    });

    test('returns false when status is completed', () => {
      setSummaryStore([], ProcessStatus.completed);
      expect(facade.isListLoading()).toBeObservable(hot('a', { a: false }));
    });
  });

  describe('isPokemonLoading', () => {
    test('returns true when status is loading', () => {
      setDetailsStore(null, ProcessStatus.loading);
      expect(facade.isPokemonLoading()).toBeObservable(hot('a', { a: true }));
    });

    test('returns false when status is completed', () => {
      setDetailsStore(null, ProcessStatus.completed);
      expect(facade.isPokemonLoading()).toBeObservable(hot('a', { a: false }));
    });
  });

  describe('isPokemonError', () => {
    test('returns true when status is failed', () => {
      setDetailsStore(null, ProcessStatus.failed);
      expect(facade.isPokemonError()).toBeObservable(hot('a', { a: true }));
    });

    test('returns false when status is completed', () => {
      setDetailsStore(null, ProcessStatus.completed);
      expect(facade.isPokemonError()).toBeObservable(hot('a', { a: false }));
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

  const setSummaryStore = (list: PokemonSummary[], status = ProcessStatus.completed) => {
    store.setState({
      pokedex: { ...fromPokedex.initialState,
        summary: { ...fromPokedex.initialState.summary,
          list,
          process: { ...fromPokedex.initialState.summary.process, status }
        }
      }
    });
  };

  const setDetailsStore = (pokemon: PokemonDetails | null, status = ProcessStatus.completed) => {
    store.setState({
      pokedex: { ...fromPokedex.initialState,
        details: { ...fromPokedex.initialState.details,
          pokemon,
          process: { ...fromPokedex.initialState.details.process, status }
        }
      }
    });
  };
});
