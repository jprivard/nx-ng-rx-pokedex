import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { fixture } from '@pokedex/api-interfaces';
import { FactoryService } from './factory.service';
import { pokemonSummary } from '../fixtures/pokemon-summary.fixture';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';

describe('Pokemon Service', () => {
  describe('Load', () => {
    it('makes the initial call returning the pokemons to load', (done) => {
      const response = fixture.list
      service.load(10, 0).subscribe(value => {
        expect(value).toEqual(response);
        done();
      });
      http.expectOne('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0').flush(response);
    });
  });

  describe('GetPokemonSummary', () => {
    it('returns PokemonSummary', (done) => {
      const url = 'http://pokeapi.co/api/v2/pokemon/bulbasaur';
      const response = fixture.pokemon[0];
      factory.toPokemonSummary.mockReturnValue(pokemonSummary[0]);
      service.getPokemonSummary(url).subscribe(value => {
        expect(value).toEqual(pokemonSummary[0]);
        expect(factory.toPokemonSummary).toHaveBeenCalledWith(response);
        done();
      });
      http.expectOne(url).flush(response);
    });
  });

  describe('getPokemonDetails', () => {
    it('returns PokemonDetails', (done) => {
      const pokemon = { id: 1 } as PokemonDetails;
      const url1 = 'https://pokeapi.co/api/v2/pokemon/bulbasaur/';
      const response1 = fixture.pokemon[0];
      const url2 = 'http://species.url/bulbasaur';
      const response2 = fixture.species[0];
      const url3 = 'http://evochain.url/bulbasaur';
      const response3 = fixture.chain[0];
      factory.toPokemonDetails.mockReturnValue(pokemon);
      service.getPokemonDetails('bulbasaur').subscribe(value => {
        expect(value).toEqual(pokemon);
        expect(factory.toPokemonDetails).toHaveBeenCalledWith(response1, response2, response3);
        done();
      });
      http.expectOne(url1).flush(response1);
      http.expectOne(url2).flush(response2);
      http.expectOne(url3).flush(response3);
    });
  });

  let service: PokemonService;
  let http: HttpTestingController;
  const factory = { toPokemonSummary: jest.fn(), toPokemonDetails: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PokemonService, { provide: FactoryService, useValue: factory } ]
    });
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });
});
