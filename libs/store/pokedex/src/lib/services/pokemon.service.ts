import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pokemon } from '@pokedex/api-interfaces';

@Injectable()
export class PokemonService {
  constructor(protected http: HttpClient) {}

  public load(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${ id }/`).pipe(
      map(pokemon => this.sanitizePokemon(pokemon))
    )
  }

  private sanitizePokemon(pokemon: Pokemon): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      species: pokemon.species,
      sprites: pokemon.sprites,
      types: pokemon.types
    };
  }
}
