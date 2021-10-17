import { Component, Input } from "@angular/core";
import { PokemonDetails } from "@pokedex/store/pokedex";

@Component({
  selector: 'pokedex-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.ccomponent.scss'],
})
export class HeaderComponent {
  @Input() public pokemon: PokemonDetails | null = null;
}
