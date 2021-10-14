import { PokemonSummary } from '../models/pokemon-summary.interface';

export const pokemonSummary = [
  { id: 1, name: 'Bulbusaur', url: '/pokemon/bulbusaur', sprite: 'http://img/1', types: ['Grass', 'Poison'] },
  { id: 2, name: 'Ivysaur', url: '/pokemon/ivysaur', sprite: 'http://img/2', types: ['Grass', 'Poison'] },
  { id: 3, name: 'Venusaur', url: '/pokemon/venusaur', sprite: 'http://img/3', types: ['Grass', 'Poison'] }
] as PokemonSummary[];
