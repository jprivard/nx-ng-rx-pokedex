import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('Pokemon Service', () => {
  describe('Load', () => {
    test('makes the initial call returning the pokemons to load', (done) => {
      const response = { results: [] };
      service.load(10, 0).subscribe(value => {
        expect(value).toEqual(response);
        done();
      });
      http.expectOne('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0').flush(response);
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
