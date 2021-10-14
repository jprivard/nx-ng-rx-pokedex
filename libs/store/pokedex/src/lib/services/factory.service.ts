import { Injectable } from '@angular/core';
import { PokemonApiResponse } from '@pokedex/api-interfaces';
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

  private capitalize(text: string): string {
    return text[0].toUpperCase() + text.substring(1);
  }
}
