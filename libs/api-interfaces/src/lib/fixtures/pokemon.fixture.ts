import { PokemonApiResponse } from '../interfaces/pokemon.interface';

export const pokemon = [
  {
    id: 1,
    name: 'bulbusaur',
    abilities:[
      { ability: { name: 'Leaf' } }
    ],
    species: {
      name: 'bulbusaur',
      url: 'http://species.url/bulbusaur'
    },
    sprites: { front_default: 'http://img/1' },
    stats: [
      { stat: { name: 'str' }, base_stat: 1 }
    ],
    types: [
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ]
  },
  {
    id: 2,
    name: 'ivysaur',
    abilities:[
      { ability: { name: 'Leaf' } }
    ],
    species: {
      name: 'bulbusaur',
      url: 'http://species.url/bulbusaur'
    },
    sprites: { front_default: 'http://img/2' },
    stats: [
      { stat: { name: 'str' }, base_stat: 1 }
    ],
    types: [
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ]
  },
  {
    id: 3,
    name: 'venusaur',
    abilities:[
      { ability: { name: 'Leaf' } }
    ],
    species: {
      name: 'bulbusaur',
      url: 'http://species.url/bulbusaur'
    },
    sprites: { front_default: 'http://img/3' },
    stats: [
      { stat: { name: 'str' }, base_stat: 1 }
    ],
    types: [
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ]
  },
] as PokemonApiResponse[];
