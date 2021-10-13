import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Pokemon } from '@pokedex/api-interfaces';
import { PokedexFacade } from '@pokedex/store/pokedex';

@Component({
  selector: 'pokedex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pokemons$: Observable<Pokemon[]> = this.pokedex.list();
  title = 'pokedex';

  constructor(private pokedex: PokedexFacade) {
    this.pokedex.initialize();
  }
}
