import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { EvolutionChain } from '@pokedex/api-interfaces';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { fixtures } from '@pokedex/store/pokedex';
import { SpeciesComponent } from './species.component';

describe('Species Component', () => {
  it('creates the species component', () => {
    expect(component).toBeTruthy();
  });

  it('displays an empty icon when first is true', () => {
    component.first = true;
    fixture.detectChanges();
    expect(element.icon()).toEqual('');
  });

  it('displays an icon when first is false', () => {
    component.first = false;
    fixture.detectChanges();
    expect(element.icon()).toEqual('subdirectory_arrow_right');
  });

  it('displays a link to pokemon when current is not the one in the chain', () => {
    component.current = 'venusaur';
    fixture.detectChanges();
    expect(element.link().innerHTML).toContain('Bulbasaur');
    expect(element.link().getAttribute('href')).toEqual('/pokemon/bulbasaur');
  });

  it('does not display a link, simply a name, when current is the one in the chain', () => {
    component.current = 'bulbasaur';
    component.chain = { ...component.chain as EvolutionChain, evolves_to: [] };
    fixture.detectChanges();
    expect(element.link()).toBeFalsy();
    expect(element.name().innerHTML).toContain('Bulbasaur');
  });

  it('displays recursively the Species Component for each child in evolution chain', () => {
    const chain = { species: { name: 'ivysaur'}, evolves_to: [] };
    component.current = 'bulbasaur';
    component.chain = { ...component.chain as EvolutionChain, evolves_to: [ chain ] };
    fixture.detectChanges();
    expect(element.chain().chain).toEqual(chain);
    expect(element.chain().current).toEqual('bulbasaur');
    expect(element.chain().first).toBeFalsy();
  });

  let fixture: ComponentFixture<SpeciesComponent>;
  let component: SpeciesComponent;
  let element: ComponentDSL<SpeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatIconModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ SpeciesComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(SpeciesComponent);
    component = fixture.componentInstance;
    component.chain = fixtures.details[0].evolution_chain;
    element = new ComponentDSL<SpeciesComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  icon = () => this.element('mat-icon').innerHTML;
  link = () => this.element('a');
  name = () => this.element('span.name');
  chain = () => this.getComponent<SpeciesComponent>('pokedex-evo-species', SpeciesComponent);
}
