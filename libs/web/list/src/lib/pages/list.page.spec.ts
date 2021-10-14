import { BehaviorSubject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';

import { ComponentInspector } from '@pokedex/spec-helpers';
import { PokedexFacade, PokemonSummary } from '@pokedex/store/pokedex';
import { ListPage } from './list.page';

describe('List Page', () => {
  it('creates the list page', () => {
    expect(component).toBeTruthy();
  });

  it('displays a spinner when the list is loading', () => {
    loading.next(true);
    fixture.detectChanges();
    expect(element.spinner()).toBeTruthy();
  });

  it('does not display a spinner when the list is completed', () => {
    loading.next(false);
    fixture.detectChanges();
    expect(element.spinner()).toBeFalsy();
  });

  it('sends the list of Pokemon to the table component', () => {
    const pokemon = [ { id: 1 } ] as PokemonSummary[];
    list.next(pokemon);
    fixture.detectChanges();
    expect(element.table().pokemon).toBe(pokemon);
  });

  it('asks the facade to load the initial page on startup', () => {
    expect(facade.load).toHaveBeenCalledWith({ page: 0, size: 10 });
  });

  it('asks the facade to load page on paginator action', async () => {
    await (await element.paginator()).goToNextPage();
    expect(facade.load).toHaveBeenCalledWith({ page: 1, size: 10 });
  });

  let fixture: ComponentFixture<ListPage>;
  let component: ListPage;
  let element: ComponentDSL;
  let list = new BehaviorSubject<PokemonSummary[]>([]);
  let loading = new BehaviorSubject<boolean>(false);
  let facade = {
    load: jest.fn(),
    list: jest.fn().mockReturnValue(list.asObservable()),
    isLoading: jest.fn().mockReturnValue(loading.asObservable())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPage, PokedexTableComponent, PokedexSpinnerComponent ],
      imports: [ MatCardModule, MatPaginatorModule ],
      providers: [ { provide: PokedexFacade, useValue: facade } ]
    }).compileComponents();
    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
    element = new ComponentDSL(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

@Component({ selector: 'pokedex-table' })
class PokedexTableComponent {
  @Input() public pokemon: PokemonSummary[] = [];
}

@Component({ selector: 'pokedex-spinner' })
class PokedexSpinnerComponent {}

class ComponentDSL extends ComponentInspector {
  spinner = () => this.getComponent<PokedexSpinnerComponent>('pokedex-spinner', PokedexSpinnerComponent);
  table = () => this.getComponent<PokedexTableComponent>('pokedex-table', PokedexTableComponent);
  paginator = async () => await this.loader.getHarness(MatPaginatorHarness);
}