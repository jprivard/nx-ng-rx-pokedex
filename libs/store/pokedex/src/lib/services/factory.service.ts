import { Injectable } from '@angular/core';
import { PokemonApiResponse } from '@pokedex/api-interfaces';
import { PokemonSummary } from '../models/pokemon-summary.interface';

@Injectable()
export class FactoryService {
  public toPokemonSummary(response: PokemonApiResponse): PokemonSummary {
    return {
      id: response.id,
      name: response.name[0].toUpperCase() + response.name.substring(1),
      sprite: response.sprites.front_default,
      types: response.types.map(type => type.type.name)
    } as PokemonSummary;
  }
}
