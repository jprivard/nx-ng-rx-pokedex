import { EvolutionChainApiResponse } from '@pokedex/api-interfaces';

export const chain = [
  {
    id: 1,
    chain: {
      species: { name: 'bulbusaur', url: 'http://species.url/bulbusaur' },
      evolves_to: []
    }
  }
] as EvolutionChainApiResponse[];
