import { TestBed } from '@angular/core/testing';
import { fixture } from '@pokedex/api-interfaces';
import { pokemonSummary } from '../fixtures/pokemon-summary.fixture';
import { FactoryService } from './factory.service';

describe('Factory Service', () => {
  describe('toPokemonSummary', () => {
    test('transforms the PokemonApiResponse to a PokemonSummary', () => {
      expect(service.toPokemonSummary(fixture.pokemon[0])).toEqual(pokemonSummary[0]);
    });
  });

  describe('toPokemonDetails', () => {
    test('transforms the trio of Pokemon, Species and EvolutionChain to a PokemonDetails', () => {
      const pokemon = fixture.pokemon[0];
      const species = fixture.species[0];
      const chain = fixture.chain[0];
      expect(service.toPokemonDetails(pokemon, species, chain)).toBeTruthy();
    });
  })

  let service: FactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ FactoryService ] });
    service = TestBed.inject(FactoryService);
  });
});
