import { Pokemon } from '@pokedex/api-interfaces';
import { initialState, State  } from '../reducers/pokemon.reducer';
import * as queries from './pokemon.selectors';

describe('Pokemon Selectors', () => {
  describe('List', () => {
    test('selector getContacts should select the list of contacts', () => {
      expect(queries.list.projector({ ...initialState })).toEqual([]);
      expect(queries.list.projector(aStateContaining(pokemons)).length).toBe(pokemons.length);
    });
  });

  const pokemons = [ { id: 1 } ] as Pokemon[];

  const aStateContaining = (list: Pokemon[]): State =>  ({ ...initialState, list });
});
