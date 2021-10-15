import { Injectable } from '@angular/core';
import { EvolutionChainApiResponse, PokemonApiResponse, SpeciesApiResponse } from '@pokedex/api-interfaces';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonSummary } from '../interfaces/pokemon-summary.interface';

@Injectable()
export class FactoryService {
  public toPokemonSummary(response: PokemonApiResponse): PokemonSummary {
    return {
      id: response.id,
      url: '/pokemon/' + response.name,
      name: this.capitalize(response.name),
      sprite: response.sprites.front_default,
      types: response.types.map(type => this.capitalize(type.type.name))
    } as PokemonSummary;
  }

  public toPokemonDetails(
    pokemon: PokemonApiResponse,
    species: SpeciesApiResponse,
    chain: EvolutionChainApiResponse
  ): PokemonDetails {
    console.log(pokemon, species, chain);
    return pokemon as PokemonDetails;
  }

  private capitalize(text: string): string {
    return text[0].toUpperCase() + text.substring(1);
  }
}
