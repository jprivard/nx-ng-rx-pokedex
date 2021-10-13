import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PokemonActions } from "./actions";
import { PokedexFacade } from './pokedex.facade';
import * as fromPokedex from './reducers';

describe('Pokedex Facade', () => {
  describe('Initialize', () => {
    test('dispatches initialize action', () => {
      facade.initialize();
      expect(dispatch).toHaveBeenCalledWith(PokemonActions.initialize());
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
});
