import { Pokemon } from '@pokedex/api-interfaces';
import { PokemonActions } from '../actions';
import { ProcessStatus } from '../enums/process-status.enum';
import { initialState, reducer } from './pokemon.reducer';

describe('Pokemon Reducer', () => {
  describe('Load', () => {
    test('sets the process status to loading and empty the list', () => {
      const state = { ...initialState, list: [ { id: 1 } as Pokemon ] };
      const result = reducer(state, PokemonActions.load({ size: 10, page: 0 }));
      expect(result.list.length).toEqual(0);
      expect(result.process.status).toEqual(ProcessStatus.loading);
    });
  });

  describe('Loaded', () => {
    test('sets the new list in the store and the process status to completed', () => {
      const list = [ { id: 1} ] as Pokemon[];
      const result = reducer({ ...initialState }, PokemonActions.loaded({ list }));
      expect(result.list.length).toEqual(1);
      expect(result.process.status).toEqual(ProcessStatus.completed);
    });
  });

  describe('Failed', () => {
    test('sets the process status as failed', () => {
      const error = new Error();
      const state = { ...initialState, list: [ { id: 1 } as Pokemon ] };
      const result = reducer(state, PokemonActions.failed({ error }));
      expect(result.process.error).toEqual(error);
      expect(result.process.status).toEqual(ProcessStatus.failed);
    });
  });
});
