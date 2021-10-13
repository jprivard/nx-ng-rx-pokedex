import { Component } from '@angular/core';
import { Pokemon } from '@pokedex/api-interfaces';
import { PokedexFacade } from '@pokedex/store/pokedex';
@Component({
  selector: 'pokedex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pokemons: Pokemon[] = [];
  title = 'pokedex';

  constructor(private pokedex: PokedexFacade) {
    this.pokedex.initialize();
  }
}
