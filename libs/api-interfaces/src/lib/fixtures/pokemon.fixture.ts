import { PokemonApiResponse } from '../interfaces/pokemon.interface';

export const pokemon = [
  { id: 1, name: 'bulbusaur', sprites: { front_default: 'http://img/1' }, types: [{ type: { name: '1' } }] },
  { id: 2, name: 'ivysaur', sprites: { front_default: 'http://img/2' }, types: [{ type: { name: '2' } }] },
  { id: 3, name: 'venusaur', sprites: { front_default: 'http://img/3' }, types: [{ type: { name: '3' } }] }
] as PokemonApiResponse[];
