import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { ProcessStatus } from '../enums/process-status.enum';
import { initialState, State  } from '../reducers/details.reducer';
import * as queries from './details.selectors';

describe('Details Selectors', () => {
  describe('selecPokemon', () => {
    it('returns the stored pokemon', () => {
      expect(queries.selectPokemon.projector({ ...initialState })).toEqual(null);
      const result = queries.selectPokemon.projector(aStateContaining(pokemon));
      expect(result).toEqual(pokemon);
    });
  });

  describe('selectLoading', () => {
    it('returns boolean if status is loading', () => {
      expect(queries.selectLoading.projector({ ...initialState })).toEqual(false);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.normal))).toBe(false);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.loading))).toBe(true);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.failed))).toBe(false);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.completed))).toBe(false);
    });
  });

  describe('selectError', () => {
    it('returns boolean if status is in error', () => {
      expect(queries.selectError.projector({ ...initialState })).toEqual(false);
      expect(queries.selectError.projector(aStateWithProcess(ProcessStatus.normal))).toBe(false);
      expect(queries.selectError.projector(aStateWithProcess(ProcessStatus.loading))).toBe(false);
      expect(queries.selectError.projector(aStateWithProcess(ProcessStatus.failed))).toBe(true);
      expect(queries.selectError.projector(aStateWithProcess(ProcessStatus.completed))).toBe(false);
    });
  });

  const pokemon = { id: 1 } as PokemonDetails;

  const aStateContaining = (pokemon: PokemonDetails): State =>  ({ ...initialState, pokemon });
  const aStateWithProcess = (status: ProcessStatus): State => ({ ...initialState,
    process: { ...initialState.process, status }
  })
});
