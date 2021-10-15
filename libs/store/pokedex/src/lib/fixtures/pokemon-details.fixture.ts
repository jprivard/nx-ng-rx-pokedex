import { PokemonDetails } from '../interfaces/pokemon-details.interface';

export const pokemonDetails = [
  {
    id: 1,
    name: 'bulbasaur',
    sprite: 'http://img/1',
    types: [ 'Grass', 'Poison' ],
    abilities: [ 'overgrow', 'chlorophyll' ],
    base_experience: 64,
    evolution_chain: {
      species: { name: 'bulbasaur' },
      evolves_to: [
        {
          species: { name: 'ivysaur' },
          evolves_to: [
            {
              species: { name: 'venusaur' },
              evolves_to: []
            }
          ]
        }
      ]
    },
    flavor_text_entries: [
      'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
    ],
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    stats: [
      { base_stat: 45, name: 'hp' },
      { base_stat: 49, name: 'attack' },
      { base_stat: 49, name: 'defense' },
      { base_stat: 65, name: 'special-attack' },
      { base_stat: 65, name: 'special-defense' },
      { base_stat: 45, name: 'speed' }
    ]
  }
] as PokemonDetails[];
