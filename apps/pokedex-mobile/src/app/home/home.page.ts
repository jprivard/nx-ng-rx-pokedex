import { Component } from '@angular/core';
import { PokedexFacade } from '@pokedex/store/pokedex';

@Component({
  selector: 'pokedex-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public displayedColumns: string[] = [ 'id', 'name' ];

  constructor(public pokedex: PokedexFacade) {
    this.load(10, 0);
  }

  public load(size: number, page: number) {
    this.pokedex.loadList({ size, page });
  }
}
