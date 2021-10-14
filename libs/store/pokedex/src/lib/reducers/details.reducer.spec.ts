import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { DetailsActions } from '../actions';
import { ProcessStatus } from '../enums/process-status.enum';
import { initialState, reducer } from './details.reducer';

describe('Details Reducer', () => {
  describe('Load', () => {
    test('sets the process status to loading and empty pokemon', () => {
      const state = { ...initialState, pokemon: { id: 1 } as PokemonDetails };
      const result = reducer(state, DetailsActions.load({ name: 'bulbisaur' }));
      expect(result.pokemon).toEqual(null);
      expect(result.process.status).toEqual(ProcessStatus.loading);
    });
  });

  describe('Loaded', () => {
    test('sets the loaded pokemon in the store and the process status to completed', () => {
      const pokemon = { id: 1 } as PokemonDetails;
      const result = reducer({ ...initialState }, DetailsActions.loaded({ pokemon }));
      expect(result.pokemon).toEqual(pokemon);
      expect(result.process.status).toEqual(ProcessStatus.completed);
    });
  });

  describe('Failed', () => {
    test('sets the process status as failed', () => {
      const error = new Error();
      const state = { ...initialState, pokemon: { id: 1 } as PokemonDetails };
      const result = reducer(state, DetailsActions.failed({ error }));
      expect(result.process.error).toEqual(error);
      expect(result.process.status).toEqual(ProcessStatus.failed);
    });
  });
});
