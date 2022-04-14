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
    expect(spectator).toBeTruthy();
  });

  it('instantiates the quote component', () => {
    expect(spectator.query(QuoteComponent)).toBeTruthy();
    expect(spectator.query(QuoteComponent)!.quotes).toEqual(spectator.component.pokemon!.flavor_text_entries);
  });

  it('instantiates the stats component', () => {
    expect(spectator.query(StatsComponent)).toBeTruthy();
    expect(spectator.query(StatsComponent)!.pokemon).toEqual(spectator.component.pokemon);
  });

  it('displays the pokemon sprite', () => {
    expect(spectator.query(byTestId('image'))!.getAttribute('src')).toBe(spectator.component.pokemon!.sprite);
  });

  it('instantiates the types component', () => {
    expect(spectator.query(TypesComponent)).toBeTruthy();
    expect(spectator.query(TypesComponent)!.types).toEqual(spectator.component.pokemon!.types);
    expect(spectator.query(byTestId('types-title'))!.innerHTML).toContain('Types');
  });

  it('instantiates the abilities component', () => {
    expect(spectator.query(AbilitiesComponent)).toBeTruthy();
    expect(spectator.query(AbilitiesComponent)!.abilities).toEqual(spectator.component.pokemon!.abilities);
    expect(spectator.query(byTestId('abilities-title'))!.innerHTML).toContain('Abilities');
  });

  it('instantiates the species component', () => {
    expect(spectator.query(SpeciesComponent)).toBeTruthy();
    expect(spectator.query(SpeciesComponent)!.chain).toEqual(spectator.component.pokemon!.evolution_chain);
    expect(spectator.query(byTestId('evo-title'))!.innerHTML).toContain('Evolution Chain');
  });

  let spectator: Spectator<LayoutComponent>;

  const createComponent = createComponentFactory({
    component: LayoutComponent,
    declarations: [ MockComponents(QuoteComponent, StatsComponent, TypesComponent, AbilitiesComponent, SpeciesComponent) ],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { pokemon: fixtures.details[0] }});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
