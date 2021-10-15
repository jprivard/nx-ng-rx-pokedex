export interface EvolutionChain {
  species: {
    name: string;
    url?: string;
  }
  evolves_to: EvolutionChain[];
}

export interface EvolutionChainApiResponse {
  id: number;
  chain: EvolutionChain;
}
