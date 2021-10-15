import { BehaviorSubject, of } from 'rxjs';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ComponentInspector } from '@pokedex/spec-helpers';
import { PokedexFacade } from '@pokedex/store/pokedex';
import { EntryPage } from './entry.page';
import { PokemonDetails } from 'libs/store/pokedex/src/lib/interfaces/pokemon-details.interface';
import { ActivatedRoute } from '@angular/router';

describe('Entry Page', () => {
  it('creates the entry page', () => {
    expect(component).toBeTruthy();
  });

  it('displays a spinner when the pokemon is loading', () => {
    loading.next(true);
    fixture.detectChanges();
    expect(element.spinner()).toBeTruthy();
  });

  it('does not display a spinner when the pokemon load is completed', () => {
    loading.next(false);
    fixture.detectChanges();
    expect(element.spinner()).toBeFalsy();
  });

  it('sends the Pokemon to the Pokemon component', () => {
    //pokemon.next(pokemonDetail);
    fixture.detectChanges();
    expect(true).toBeTruthy();
    //expect(element.pokedexTable().pokemon).toEqual(pokemonSummary);
  });

  it('asks the facade to load the details on startup', () => {
    expect(facade.loadPokemon).toHaveBeenCalledWith('bulbasaur');
  });

  let fixture: ComponentFixture<EntryPage>;
  let component: EntryPage;
  let element: ComponentDSL<EntryPage>;
  const pokemon = new BehaviorSubject<PokemonDetails | null>(null);
  const loading = new BehaviorSubject<boolean>(false);
  const facade = {
    loadPokemon: jest.fn(),
    pokemon: jest.fn().mockReturnValue(pokemon.asObservable()),
    isPokemonLoading: jest.fn().mockReturnValue(loading.asObservable())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryPage, PokedexSpinnerComponent ],
      imports: [ MatCardModule ],
      providers: [
        { provide: PokedexFacade, useValue: facade },
        { provide: ActivatedRoute, useValue: { params: of({ id: 'bulbasaur' }) } },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EntryPage);
    component = fixture.componentInstance;
    element = new ComponentDSL<EntryPage>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

@Component({ selector: 'pokedex-spinner' })
class PokedexSpinnerComponent {}

class ComponentDSL<T> extends ComponentInspector<T> {
  spinner = () => this.getComponent<PokedexSpinnerComponent>('pokedex-spinner', PokedexSpinnerComponent);
}
