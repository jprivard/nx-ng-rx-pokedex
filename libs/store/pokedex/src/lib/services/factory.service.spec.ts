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

  let service: FactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ FactoryService ] });
    service = TestBed.inject(FactoryService);
  });
});
