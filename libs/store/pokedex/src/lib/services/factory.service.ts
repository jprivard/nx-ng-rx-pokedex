import { Injectable } from '@angular/core';
import { EvolutionChain, EvolutionChainApiResponse, PokemonApiResponse, PokemonStat, SpeciesApiResponse } from '@pokedex/api-interfaces';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonSummary } from '../interfaces/pokemon-summary.interface';

@Injectable()
export class FactoryService {
  public toPokemonSummary(response: PokemonApiResponse): PokemonSummary {
    return {
      id: response.id,
      name: response.name,
      sprite: response.sprites.front_default,
      types: response.types.map(type => this.capitalize(type.type.name))
    } as PokemonSummary;
  }

  public toPokemonDetails(
    pokemon: PokemonApiResponse,
    species: SpeciesApiResponse,
    chain: EvolutionChainApiResponse
  ): PokemonDetails {
    return {
      ...this.toPokemonSummary(pokemon),
      abilities: pokemon.abilities.map(a => a.ability.name),
      base_experience: pokemon.base_experience,
      evolution_chain: this.getEvolutionChain(chain.chain),
      flavor_text_entries: species.flavor_text_entries.filter(t => t.language.name === 'en').map(t => t.flavor_text),
      is_baby: species.is_baby,
      is_legendary: species.is_legendary,
      is_mythical: species.is_mythical,
      stats: pokemon.stats.map((s: PokemonStat) => ({ base_stat: s.base_stat, name: s.stat.name })),
    } as PokemonDetails;
  }

  private capitalize(text: string): string {
    return text[0].toUpperCase() + text.substring(1);
  }

  private getEvolutionChain(chain: EvolutionChain): EvolutionChain {
    return {
      species: { name: chain.species.name },
      evolves_to: chain.evolves_to.map(e => this.getEvolutionChain(e))
    } as EvolutionChain;
  }
}
