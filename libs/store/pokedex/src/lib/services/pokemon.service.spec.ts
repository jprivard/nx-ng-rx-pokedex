import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { Pokemon } from '@pokedex/api-interfaces';

describe('Pokemon Service', () => {
  describe('Load', () => {
    test('gets and sanitizes pokemon data', (done) => {
      const pokemon = { id: 1, more_data_to_be_erased: true };
      service.load(1).subscribe(value => {
        expect(value).toEqual({ id: 1 });
        done();
      });
      http.expectOne('https://pokeapi.co/api/v2/pokemon/1/').flush(pokemon);
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
