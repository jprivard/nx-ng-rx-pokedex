import { PokemonSummary } from '../interfaces/pokemon-summary.interface';
import { SummaryActions } from '../actions';
import { ProcessStatus } from '../enums/process-status.enum';
import { initialState, reducer } from './summary.reducer';

describe('Summary Reducer', () => {
  describe('Load', () => {
    it('sets the process status to loading and empty the list', () => {
      const state = { ...initialState, list: [ { id: 1 } as PokemonSummary ] };
      const result = reducer(state, SummaryActions.load({ size: 10, page: 0 }));
      expect(result.list.length).toEqual(0);
      expect(result.process.status).toEqual(ProcessStatus.loading);
    });
  });

  describe('Loaded', () => {
    it('sets the new list in the store and the process status to completed', () => {
      const list = [ { id: 1} ] as PokemonSummary[];
      const result = reducer({ ...initialState }, SummaryActions.loaded({ list }));
      expect(result.list.length).toEqual(1);
      expect(result.process.status).toEqual(ProcessStatus.completed);
    });
  });

  describe('Failed', () => {
    it('sets the process status as failed', () => {
      const error = new Error();
      const state = { ...initialState, list: [ { id: 1 } as PokemonSummary ] };
      const result = reducer(state, SummaryActions.failed({ error }));
      expect(result.process.error).toEqual(error);
      expect(result.process.status).toEqual(ProcessStatus.failed);
    });
  });
});
