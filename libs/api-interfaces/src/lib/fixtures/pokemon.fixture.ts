import { PokemonApiResponse } from '../interfaces/pokemon.interface';

export const pokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    abilities: [
      { ability: { name: 'overgrow' } },
      { ability: { name: 'chlorophyll' } }
    ],
    base_experience: 64,
    species: {
      name: 'bulbasaur',
      url: 'http://species.url/bulbasaur'
    },
    sprites: { front_default: 'http://img/1' },
    stats: [
      { stat: { name: 'hp' }, base_stat: 45 },
      { stat: { name: 'attack' }, base_stat: 49 },
      { stat: { name: 'defense' }, base_stat: 49 },
      { stat: { name: 'special-attack' }, base_stat: 65 },
      { stat: { name: 'special-defense' }, base_stat: 65 },
      { stat: { name: 'speed' }, base_stat: 45 },
    ],
    types: [
      { type: { name: 'grass' } },
      { type: { name: 'poison' } }
    ]
  },
  {
    id: 2,
    name: 'ivysaur',
    abilities: [
      { ability: { name: 'overgrow' } },
      { ability: { name: 'chlorophyll' } }
    ],
    species: {
      name: 'bulbasaur',
      url: 'http://species.url/bulbasaur'
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
    abilities: [
      { ability: { name: 'overgrow' } },
      { ability: { name: 'chlorophyll' } }
    ],
    species: {
      name: 'bulbasaur',
      url: 'http://species.url/bulbasaur'
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
