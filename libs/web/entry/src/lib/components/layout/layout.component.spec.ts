import { createComponentFactory, Spectator, byTestId } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { fixtures } from '@pokedex/store/pokedex';
import { LayoutComponent } from './layout.component';
import { QuoteComponent } from '../quote/quote.component';
import { StatsComponent } from '../stats/stats.component';
import { TypesComponent } from '../types/types.component';
import { AbilitiesComponent } from '../abilities/abilities.component';
import { SpeciesComponent } from '../species/species.component';

describe('Layout Component', () => {
  it('creates the layout component', () => {
    expect(component).toBeTruthy();
  });

  it('instantiates the quote component', () => {
    expect(elements.quote()).toBeTruthy();
    expect(elements.quote().quotes).toEqual(component.pokemon!.flavor_text_entries);
  });

  it('instantiates the stats component', () => {
    expect(elements.stats()).toBeTruthy();
    expect(elements.stats().pokemon).toEqual(component.pokemon);
  });

  it('displays the pokemon sprite', () => {
    expect(elements.image().getAttribute('src')).toBe(component.pokemon!.sprite);
  });

  it('instantiates the types component', () => {
    expect(elements.types.component()).toBeTruthy();
    expect(elements.types.component().types).toEqual(component.pokemon!.types);
    expect(elements.types.title().innerHTML).toContain('Types');
  });

  it('instantiates the abilities component', () => {
    expect(elements.abilities.component()).toBeTruthy();
    expect(elements.abilities.component().abilities).toEqual(component.pokemon!.abilities);
    expect(elements.abilities.title().innerHTML).toContain('Abilities');
  });

  it('instantiates the species component', () => {
    expect(elements.evolution.component()).toBeTruthy();
    expect(elements.evolution.component().chain).toEqual(component.pokemon!.evolution_chain);
    expect(elements.evolution.title().innerHTML).toContain('Evolution Chain');
  });

  let spectator: Spectator<LayoutComponent>;
  let component: LayoutComponent;
  const createComponent = createComponentFactory({
    component: LayoutComponent,
    declarations: [ MockComponents(QuoteComponent, StatsComponent, TypesComponent, AbilitiesComponent, SpeciesComponent) ],
    shallow: true,
  });
  const elements = {
    abilities: {
      component: () => spectator.query(AbilitiesComponent)!,
      title: () => spectator.query(byTestId('abilities-title'))!,
    },
    evolution: {
      component: () => spectator.query(SpeciesComponent)!,
      title: () => spectator.query(byTestId('evo-title'))!,
    },
    types: {
      component: () => spectator.query(TypesComponent)!,
      title: () => spectator.query(byTestId('types-title'))!,
    },
    image: () => spectator.query(byTestId('image'))!,
    stats: () => spectator.query(StatsComponent)!,
    quote: () => spectator.query(QuoteComponent)!,
  }

  beforeEach(() => {
    spectator = createComponent({ props: { pokemon: fixtures.details[0] }});
    component = spectator.component;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
