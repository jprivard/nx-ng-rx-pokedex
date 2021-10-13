import { Component, ViewChild } from "@angular/core";
import { Observable } from "rxjs";

import { PokedexFacade, PokemonSummary } from '@pokedex/store/pokedex';
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'pokedex-list-page',
  templateUrl: 'list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage {
  displayedColumns: string[] = [ 'id', 'sprite', 'name', 'types' ];
  pokemons$: Observable<PokemonSummary[]> = this.pokedex.list();
  isLoading$: Observable<boolean> = this.pokedex.isLoading();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private pokedex: PokedexFacade) {
    this.load(10, 0);
  }

  public load(size: number, page: number) {
    this.pokedex.load({ size, page });
  }
}
