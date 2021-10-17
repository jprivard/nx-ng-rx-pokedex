import { EvolutionChainApiResponse } from '../interfaces/evolution-chain.interface';

export const chain = [
  {
    id: 1,
    chain: {
      species: { name: 'bulbasaur', url: 'http://species.url/bulbasaur' },
      evolves_to: [{
        species: { name: 'ivysaur', url: 'http://species.url/ivysaur' },
        evolves_to: [{
          species: { name: 'venusaur', url: 'http://species.url/venusaur' },
          evolves_to: []
        }]
      }]
    }
  }
] as EvolutionChainApiResponse[];
