import { TestBed } from '@angular/core/testing';
import { fixture } from '@pokedex/api-interfaces';
import { summary, details } from '../fixtures';
import { FactoryService } from './factory.service';

describe('Factory Service', () => {
  describe('toPokemonSummary', () => {
    it('transforms the PokemonApiResponse to a PokemonSummary', () => {
      expect(service.toPokemonSummary(fixture.pokemon[0])).toEqual(summary[0]);
    });
  });

  describe('toPokemonDetails', () => {
    it('transforms the trio of Pokemon, Species and EvolutionChain to a PokemonDetails', () => {
      const pokemon = fixture.pokemon[0];
      const species = fixture.species[0];
      const chain = fixture.chain[0];
      expect(service.toPokemonDetails(pokemon, species, chain)).toEqual(details[0]);
    });
  })

  let service: FactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ FactoryService ] });
    service = TestBed.inject(FactoryService);
  });
});
