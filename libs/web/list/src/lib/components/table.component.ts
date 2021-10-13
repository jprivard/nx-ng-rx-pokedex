import { Component, Input } from "@angular/core";
import { PokemonSummary } from '@pokedex/store/pokedex';

@Component({
  selector: 'pokedex-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public displayedColumns: string[] = [ 'id', 'sprite', 'name', 'types' ];
  @Input() public pokemon: PokemonSummary[] = [];
}
