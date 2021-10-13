import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { fixture } from '@pokedex/api-interfaces';

describe('Pokemon Service', () => {
  describe('Load', () => {
    test('makes the initial call returning the pokemons to load', (done) => {
      const response = fixture.list
      service.load(10, 0).subscribe(value => {
        expect(value).toEqual(response);
        done();
      });
      http.expectOne('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0').flush(response);
    });
  });

  describe('GetPokemonSummary', () => {
    test('returns Pokemon', (done) => {
      const url = 'http://pokeapi.co/api/v2/pokemon/bulbusaur';
      const response = fixture.pokemon[0];
      service.getPokemonSummary(url).subscribe(value => {
        expect(value).toEqual(response);
        done();
      });
      http.expectOne(url).flush(response);
    });
  });

  let service: PokemonService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PokemonService ]
    });
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });
});
