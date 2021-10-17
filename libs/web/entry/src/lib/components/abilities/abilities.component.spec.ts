import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { ReformatPipe } from '../../pipes/reformat.pipe';
import { AbilitiesComponent } from './abilities.component';

describe('Abilities Component', () => {
  it('creates the abilities component', () => {
    expect(component).toBeTruthy();
  });

  it('shows as many list item as there are abilities', () => {
    component.abilities = ['hp', 'special-attack'];
    fixture.detectChanges();
    expect(element.item().length).toEqual(2);
    expect(element.item()[0]).toContain('HP');
    expect(element.item()[1]).toContain('Special Attack');
  });

  let fixture: ComponentFixture<AbilitiesComponent>;
  let component: AbilitiesComponent;
  let element: ComponentDSL<AbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilitiesComponent, ReformatPipe ],
    }).compileComponents();
    fixture = TestBed.createComponent(AbilitiesComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<AbilitiesComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  item = () => this.queryAll('ul li').map(i => i.nativeElement.innerHTML);
}
