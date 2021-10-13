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
