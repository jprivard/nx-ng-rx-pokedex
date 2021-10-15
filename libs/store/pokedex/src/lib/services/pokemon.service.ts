import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  EvolutionChainApiResponse,
  ListApiRepsonse,
  PokemonApiResponse,
  SpeciesApiResponse
} from '@pokedex/api-interfaces';
import { PokemonSummary } from '../..';
import { FactoryService } from './factory.service';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient, private factory: FactoryService) {}

  public load(limit: number, offset: number): Observable<ListApiRepsonse> {
    return this.http.get<ListApiRepsonse>(`https://pokeapi.co/api/v2/pokemon/?limit=${ limit }&offset=${ offset }`);
  }

  public getPokemonSummary(url: string): Observable<PokemonSummary> {
    return this.http.get<PokemonApiResponse>(url).pipe(
      map(pokemon => this.factory.toPokemonSummary(pokemon))
    );
  }

  public getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon/${ name }/`).pipe(
      switchMap(pokemon => this.http.get<SpeciesApiResponse>(pokemon.species.url).pipe(
        switchMap(species => this.http.get<EvolutionChainApiResponse>(species.evolution_chain.url).pipe(
          map(chain => this.factory.toPokemonDetails(pokemon, species, chain))
        ))
      ))
    );
  }
}
