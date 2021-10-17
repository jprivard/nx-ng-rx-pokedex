import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentInspector } from '@pokedex/spec-helpers';
import { TypesComponent } from './types.component';

describe('Types Component', () => {
  it('creates the types component', () => {
    expect(component).toBeTruthy();
  });

  it('shows no type when empty array passed as input', () => {
    component.types = [];
    fixture.detectChanges();
    expect(element.types().length).toEqual(0);
  });

  it('displays an image and the type name for each type in array', () => {
    component.types = ['Normal', 'Flying'];
    fixture.detectChanges();
    expect(element.types().length).toEqual(2);
    expect(element.type(1).imageSrc()).toEqual('/assets/types/Normal.svg');
    expect(element.type(1).name()).toContain('Normal');
    expect(element.type(2).imageSrc()).toEqual('/assets/types/Flying.svg');
    expect(element.type(2).name()).toContain('Flying');
  });

  let fixture: ComponentFixture<TypesComponent>;
  let component: TypesComponent;
  let element: ComponentDSL<TypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    element = new ComponentDSL<TypesComponent>(fixture);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

class ComponentDSL<T> extends ComponentInspector<T> {
  types = () => this.queryAll('div');
  type = (row: number) => ({
    imageSrc: () => this.element(`div:nth-of-type(${ row }) > img`).getAttribute('src'),
    name: () => this.element(`div:nth-of-type(${ row }) > span`).innerHTML
  });
}
