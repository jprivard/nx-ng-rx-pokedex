import { Component } from '@angular/core';
import { Pokemon } from '@pokedex/api-interfaces';
@Component({
  selector: 'pokedex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pokemons: Pokemon[] = [];
  title = 'pokedex';
}
