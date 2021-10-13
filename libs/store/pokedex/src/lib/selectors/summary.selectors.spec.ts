import { PokemonSummary } from '@pokedex/api-interfaces';
import { ProcessStatus } from '../enums/process-status.enum';
import { initialState, State  } from '../reducers/summary.reducer';
import * as queries from './summary.selectors';

describe('Pokemon Selectors', () => {
  describe('selectList', () => {
    test('returns the list of pokemons by ID ascending', () => {
      expect(queries.selectList.projector({ ...initialState })).toEqual([]);
      const result = queries.selectList.projector(aStateContaining(pokemons));
      expect(result.length).toBe(pokemons.length);
      expect(result.map(p => p.id)).toEqual([1, 2, 3]);
    });
  });

  describe('selectLoading', () => {
    test('returns boolean if status is loading', () => {
      expect(queries.selectLoading.projector({ ...initialState })).toEqual(false);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.normal))).toBe(false);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.loading))).toBe(true);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.failed))).toBe(false);
      expect(queries.selectLoading.projector(aStateWithProcess(ProcessStatus.completed))).toBe(false);
    });
  });

  const pokemons = [ { id: 2 }, { id: 3 }, { id: 1 } ] as PokemonSummary[];

  const aStateContaining = (list: PokemonSummary[]): State =>  ({ ...initialState, list });
  const aStateWithProcess = (status: ProcessStatus): State => ({ ...initialState,
    process: { ...initialState.process, status }
  })
});
