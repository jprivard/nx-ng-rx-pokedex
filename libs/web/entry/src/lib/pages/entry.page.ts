import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";

import { PokedexFacade } from '@pokedex/store/pokedex';

@Component({
  selector: 'pokedex-entry-page',
  template: 'Noice',
  styleUrls: [],
})
export class EntryPage {
  constructor(
    private pokedex: PokedexFacade,
    private route: ActivatedRoute,
  ) {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.pokedex.loadPokemon(params.id);
    });
  }
}
