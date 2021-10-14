import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";

import { PokedexFacade } from '@pokedex/store/pokedex';
import { Observable } from "rxjs";

@Component({
  selector: 'pokedex-entry-page',
  templateUrl: './entry.page.html',
  styleUrls: [],
})
export class EntryPage {
  public pokemon$ = this.pokedex.pokemon();
  public isLoading$: Observable<boolean> = this.pokedex.isPokemonLoading();

  constructor(private pokedex: PokedexFacade, private route: ActivatedRoute) {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.pokedex.loadPokemon(params.id);
    });
  }
}
