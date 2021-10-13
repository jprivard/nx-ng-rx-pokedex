import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { Pokemon } from '@pokedex/api-interfaces';

@Injectable()
export class PokemonService {
  constructor(protected http: HttpClient) {}

  public load(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/?limit=${ limit }&offset=${ offset }`);
  }

  public getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${ id }/`).pipe(
      switchMap(pokemon => this.http.get<any>(pokemon.species.url).pipe(
        switchMap(species => this.http.get<any>(species.evolution_chain.url).pipe(
          map(chain => {
            return pokemon;
          })
        ))
      ))
    );
  }
}
