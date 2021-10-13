export * from './lib/pokemon-type.interface';
export * from './lib/pokemon.interface';
export * from './lib/species.interface';
export * from './lib/sprite.interface';

export interface ListApiRepsonse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  species: {
    url: string;
    name: string;
  };
  sprites: {
    back_female: string;
    back_shiny_female: string;
    back_default: string;
    front_female: string;
    front_shiny_female: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];
}

export interface SpeciesApiResponse {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  }
}
export interface EvolutionChain {
  species: {
    name: string;
    url: string;
  }
  evolve_to: EvolutionChain;
}

export interface EvolutionChainResponseApi {
  id: number;
  chain: EvolutionChain;
}
