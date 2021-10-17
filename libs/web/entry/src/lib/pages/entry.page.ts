import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PokedexFacade } from '@pokedex/store/pokedex';
import { Observable } from "rxjs";
import { PokemonDetails } from "@pokedex/store/pokedex";

@Component({
  selector: 'pokedex-entry-page',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnDestroy {
  public pokemon$: Observable<PokemonDetails | null> = this.pokedex.pokemon();
  public isLoading$: Observable<boolean> = this.pokedex.isPokemonLoading();
  public isError$: Observable<boolean> = this.pokedex.isPokemonError();
  private subscription;

  constructor(private pokedex: PokedexFacade, private route: ActivatedRoute) {
    this.subscription = this.route.params.subscribe(params => {
      this.pokedex.loadPokemon(params.id);
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
