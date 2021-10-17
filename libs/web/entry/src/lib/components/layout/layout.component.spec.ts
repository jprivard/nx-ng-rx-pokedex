import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvolutionChain } from '@pokedex/api-interfaces';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { fixtures, PokemonDetails } from '@pokedex/store/pokedex';
import { LayoutComponent } from './layout.component';

describe('Layout Component', () => {
  it('creates the layout component', () => {
    expect(component).toBeTruthy();
  });

  it('instantiates the quote component', () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    expect(element.quote()).toBeTruthy();
    expect(element.quote().quotes).toEqual(component.pokemon.flavor_text_entries);
  });

  it('instantiates the stats component', () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    expect(element.stats()).toBeTruthy();
    expect(element.stats().pokemon).toEqual(component.pokemon);
  });

  it('displays the pokemon sprite', () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    expect(element.image().getAttribute('src')).toBe(component.pokemon.sprite);
  });

  it('instantiates the types component', () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    expect(element.types().title().innerHTML).toContain('Types');
    expect(element.types().component()).toBeTruthy();
    expect(element.types().component().types).toEqual(component.pokemon.types);
  });

  it('instantiates the abilities component', () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    expect(element.abilities().title().innerHTML).toContain('Abilities');
    expect(element.abilities().component()).toBeTruthy();
    expect(element.abilities().component().abilities).toEqual(component.pokemon.abilities);
  });

  it('instantiates the species component', () => {
    component.pokemon = fixtures.details[0];
    fixture.detectChanges();
    expect(element.chain().title().innerHTML).toContain('Evolution Chain');
    expect(element.chain().component()).toBeTruthy();
    expect(element.chain().component().chain).toEqual(component.pokemon.evolution_chain);
  });

  let fixture: ComponentFixture<LayoutComponent>;
  let component: LayoutComponent;
  let element: ComponentDSL<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        QuoteComponent,
        StatsComponent,
        TypesComponent,
        AbilitiesComponent,
        SpeciesComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<LayoutComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

@Component({ selector: 'pokedex-quote' })
class QuoteComponent {
  @Input() public quotes: string[] = [];
}

@Component({ selector: 'pokedex-stats' })
class StatsComponent {
  @Input() public pokemon: PokemonDetails | undefined;
}

@Component({ selector: 'pokedex-types' })
class TypesComponent {
  @Input() public types: string[] = [];
}

@Component({ selector: 'pokedex-abilities' })
class AbilitiesComponent {
  @Input() public abilities: string[] = [];
}

@Component({ selector: 'pokedex-evo-species' })
class SpeciesComponent {
  @Input() public current = '';
  @Input() public chain: EvolutionChain | undefined;
}

class ComponentDSL<T> extends ComponentInspector<T> {
  image = () => this.element('img');
  quote = () => this.getComponent<QuoteComponent>('pokedex-quote', QuoteComponent);
  stats = () => this.getComponent<StatsComponent>('pokedex-stats', StatsComponent);
  types = () => ({
    title: () => this.element('.types .title'),
    component: () => this.getComponent<TypesComponent>('pokedex-types', TypesComponent)
  });
  abilities = () => ({
    title: () => this.element('.abilities .title'),
    component: () => this.getComponent<AbilitiesComponent>('pokedex-abilities', AbilitiesComponent)
  });
  chain = () => ({
    title: () => this.element('.chain .title'),
    component: () => this.getComponent<SpeciesComponent>('pokedex-evo-species', SpeciesComponent)
  });
}
