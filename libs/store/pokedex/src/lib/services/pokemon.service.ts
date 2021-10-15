import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  EvolutionChainResponseApi,
  ListApiRepsonse,
  PokemonApiResponse,
  SpeciesApiResponse
} from '@pokedex/api-interfaces';

@Injectable()
export class PokemonService {
  constructor(protected http: HttpClient) {}

  public load(limit: number, offset: number): Observable<ListApiRepsonse> {
    return this.http.get<ListApiRepsonse>(`https://pokeapi.co/api/v2/pokemon/?limit=${ limit }&offset=${ offset }`);
  }

  public getPokemonSummary(url: string): Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(url);
  }

  public getPokemonDetails(name: string): Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon/${ name }/`).pipe(
      switchMap(pokemon => this.http.get<SpeciesApiResponse>(pokemon.species.url).pipe(
        switchMap(species => this.http.get<EvolutionChainResponseApi>(species.evolution_chain.url).pipe(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          map(chain => pokemon)
        ))
      ))
    );
  }
}
