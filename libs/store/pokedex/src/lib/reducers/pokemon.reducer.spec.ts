import { Pokemon } from '@pokedex/api-interfaces';
import { PokemonActions } from '../actions';
import { ProcessStatus } from '../enums/process-status.enum';
import { initialState, reducer } from './pokemon.reducer';

describe('Pokemon Reducer', () => {
  describe('Initialize', () => {
    test('resets the data and sets process status to loading', () => {
      const state = { ...initialState, list: [ { id: 1 } as Pokemon ] };
      const result = reducer(state, PokemonActions.initialize());
      expect(result.list.length).toEqual(0);
      expect(result.process.status).toEqual(ProcessStatus.loading);
    });
  });

  describe('Loaded', () => {
    test('adds newly received data in the list', () => {
      const state = { ...initialState, list: [ { id: 1 } as Pokemon ] };
      const pokemon = { id: 2 } as Pokemon;
      const result = reducer(state, PokemonActions.loaded({ pokemon }));
      expect(result.list.length).toEqual(2);
    });
  });

  describe('Loaded', () => {
    test('adds newly received data in the list', () => {
      const error = new Error();
      const state = { ...initialState, list: [ { id: 1 } as Pokemon ] };
      const result = reducer(state, PokemonActions.failed({ error }));
      expect(result.process.error).toEqual(error);
      expect(result.process.status).toEqual(ProcessStatus.failed);
    });
  });

  describe('Initialized', () => {
    test('sets the process status to completed', () => {
      const state = { ...initialState, list: [ { id: 1 } as Pokemon ] };
      const result = reducer(state, PokemonActions.initialized());
      expect(result.process.status).toEqual(ProcessStatus.completed);
    });
  });
});
