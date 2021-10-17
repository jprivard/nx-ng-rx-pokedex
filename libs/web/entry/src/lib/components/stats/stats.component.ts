import { Component, Input } from "@angular/core";
import { PokemonDetails } from "@pokedex/store/pokedex";

@Component({
  selector: 'pokedex-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  public stats: Stats[] = [];
  public displayedColumns = ['name', 'value'];
  @Input() set pokemon(pokemon: PokemonDetails) {
    const stats: Stats[] = [
      { name: 'Base Experience', value: pokemon.base_experience }
    ];
    this.stats = stats.concat(pokemon.stats.map(
      s => ({ name: s.name, value: s.base_stat })
    ));
  }
}

interface Stats {
  name: string;
  value: number;
}
