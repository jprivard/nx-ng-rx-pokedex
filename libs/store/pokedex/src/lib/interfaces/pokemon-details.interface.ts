import { EvolutionChain } from '@pokedex/api-interfaces';
import { PokemonSummary } from './pokemon-summary.interface';

export interface PokemonDetails extends PokemonSummary {
  abilities: string[];
  base_experience: number;
  evolution_chain: EvolutionChain;
  flavor_text_entries: string[];
  stats: {
    name: string;
    base_stat: number;
  }[];
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
}
