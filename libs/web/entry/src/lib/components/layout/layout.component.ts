import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { PokemonDetails } from "@pokedex/store/pokedex";

@Component({
  selector: 'pokedex-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input() public pokemon: PokemonDetails | undefined;
}
