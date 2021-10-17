import { BehaviorSubject, of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ComponentInspector } from '@pokedex/spec-helpers';
import { fixtures, PokedexFacade } from '@pokedex/store/pokedex';
import { EntryPage } from './entry.page';
import { PokemonDetails } from '@pokedex/store/pokedex';
import { ActivatedRoute } from '@angular/router';

describe('Entry Page', () => {
  it('creates the entry page', () => {
    expect(component).toBeTruthy();
  });

  it('displays a spinner when the pokemon is loading', () => {
    loading.next(true);
    fixture.detectChanges();
    expect(element.spinner()).toBeTruthy();
    expect(element.layout()).toBeFalsy();
    expect(element.notFound()).toBeFalsy();
  });

  it('does not display a spinner when the pokemon load is completed', () => {
    loading.next(false);
    fixture.detectChanges();
    expect(element.spinner()).toBeFalsy();
  });

  it('displays a not found component when there was an error', () => {
    error.next(true);
    fixture.detectChanges();
    expect(element.notFound()).toBeTruthy();
  })

  it('sends the Pokemon to the Layout and Header components', () => {
    pokemon.next(fixtures.details[0]);
    fixture.detectChanges();
    expect(element.layout()).toBeTruthy();
    expect(element.layout().pokemon).toEqual(fixtures.details[0]);
    expect(element.header()).toBeTruthy();
    expect(element.header().pokemon).toEqual(fixtures.details[0]);
  });

  it('asks the facade to load the details on startup', () => {
    expect(facade.loadPokemon).toHaveBeenCalledWith('bulbasaur');
  });

  let fixture: ComponentFixture<EntryPage>;
  let component: EntryPage;
  let element: ComponentDSL<EntryPage>;
  const pokemon = new BehaviorSubject<PokemonDetails | null>(null);
  const loading = new BehaviorSubject<boolean>(false);
  const error = new BehaviorSubject<boolean>(false);
  const facade = {
    loadPokemon: jest.fn(),
    pokemon: jest.fn().mockReturnValue(pokemon.asObservable()),
    isPokemonLoading: jest.fn().mockReturnValue(loading.asObservable()),
    isPokemonError: jest.fn().mockReturnValue(error.asObservable()),
  };

  beforeEach(async () => {
    loading.next(false);
    error.next(false);
    pokemon.next(null);
    await TestBed.configureTestingModule({
      declarations: [ EntryPage, SpinnerComponent, LayoutComponent, NotFoundComponent, HeaderComponent ],
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
class SpinnerComponent {}

@Component({ selector: 'pokedex-not-found' })
class NotFoundComponent {}

@Component({ selector: 'pokedex-layout' })
class LayoutComponent {
  @Input() pokemon: PokemonDetails | null = null;
}

@Component({ selector: 'pokedex-header' })
class HeaderComponent {
  @Input() pokemon: PokemonDetails | null = null;
}

class ComponentDSL<T> extends ComponentInspector<T> {
  spinner = () => this.getComponent<SpinnerComponent>('pokedex-spinner', SpinnerComponent);
  layout = () => this.getComponent<LayoutComponent>('pokedex-layout', LayoutComponent);
  header = () => this.getComponent<HeaderComponent>('pokedex-header', HeaderComponent);
  notFound = () => this.getComponent<NotFoundComponent>('pokedex-not-found', NotFoundComponent);
}
