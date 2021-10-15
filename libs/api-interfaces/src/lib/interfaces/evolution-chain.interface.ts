export interface EvolutionChain {
  species: {
    name: string;
    url: string;
  }
  evolve_to: EvolutionChain;
}

export interface EvolutionChainApiResponse {
  id: number;
  chain: EvolutionChain;
}
