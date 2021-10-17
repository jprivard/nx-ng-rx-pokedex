import { Component, Input } from "@angular/core";
import { EvolutionChain } from "@pokedex/api-interfaces";

@Component({
  selector: 'pokedex-evo-species',
  templateUrl: `./species.component.html`,
  styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent {
  @Input() public chain: EvolutionChain | undefined;
  @Input() public first = true;
  @Input() public current = '';
}
